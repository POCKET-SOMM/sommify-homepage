import './PairingTool.scss';
import React from 'react';
import { Form, Modal, Button, ListGroup, Toast, Offcanvas, Badge, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { BsXLg, BsCheckLg } from "react-icons/bs";
import Loadable from '../Loadable';
import { ChevronCompactLeft, ChevronCompactRight } from 'react-bootstrap-icons';
import { SERVER_URL } from '../../App';
import WinePlate from '../WinePlate';
import Tag from './Tag';

const emptyRecipe = {
    steps: '',
    ingredients: [],
    regions: [],
    labels: [],
    pairingText: ''
}

class PairingTool extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            updating: false,
            recipeHistory: [],
            recipeIndex: -1,
            show: false,
            toastShow: false,
            showHistory: false,
            toastContent: '',
            textBoxContent: ''
        }

        this.pairingChanged = this.pairingChanged.bind(this)
        this.wineStates = this.wineStates.bind(this)
    }

    componentDidMount() {
        this.nextRecipe()
    }

    handleClose = () => this.setState({ show: false })
    handleShow = () => this.setState({ show: true })
    handleCloseHistory = () => this.setState({ showHistory: false })
    handleShowHistory = () => this.setState({ showHistory: true })

    goToRecipe = (index) => {
        this.setState({
            recipeIndex: index,
            textBoxContent: this.state.recipeHistory[index].pairingText
        })
    }

    handleNextClick = () => {
        if (this.state.loading)
            return

        let index = this.state.recipeIndex
        if (index < this.state.recipeHistory.length - 1) {
            this.goToRecipe(index + 1)
        } else {
            this.nextRecipe()
        }
    }

    handlePrevClick = () => {
        if (this.state.loading)
            return

        let index = this.state.recipeIndex
        index > 0 && this.goToRecipe(index - 1)
    }

    handleCreateToast = (title) => {
        this.setState({ toast: title })
    }

    isUrl(text) {
        var expression = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression)

        if (text.match(regex)) {
            return true
        } else
            return false
    }

    handleWineCancel = (index) => {
        if (this.currentRecipe().recomSubmitted)
            return

        let history = this.state.recipeHistory

        if (history[this.state.recipeIndex].wines[index].state === 'declined')
            history[this.state.recipeIndex].wines[index].state = null
        else {
            history[this.state.recipeIndex].wines[index].state = 'declined'
        }

        this.setState({
            recipeHistory: history
        })
    }

    handleWineAccept = (index) => {
        if (this.currentRecipe().recomSubmitted)
            return

        let history = this.state.recipeHistory

        if (history[this.state.recipeIndex].wines[index].state === 'accepted')
            history[this.state.recipeIndex].wines[index].state = null
        else {
            history[this.state.recipeIndex].wines[index].state = 'accepted'
        }

        this.setState({
            recipeHistory: history
        })
    }

    submitRecipe(wines) {
        const title = this.currentRecipe().title

        let history = this.state.recipeHistory
        history[this.state.recipeIndex].paired = wines.length
        history[this.state.recipeIndex].pairingText = this.state.textBoxContent
        // let isUpdate = this.state.recipeIndex + 1 !== this.state.recipeHistory.length

        const options = {
            method: 'POST',
            url: `${SERVER_URL}/api/v1/recipePairing`,
            headers: { 'Content-Type': 'application/json' },
            data: {
                wines: wines,
                recipeId: this.currentRecipe().id,
                recipeTitle: this.currentRecipe().title,
                pairingInfo: this.currentRecipe().category
            }
        };

        this.setState({ updating: true })

        // FOR TESTING
        // this.setState({
        //     toastShow: true,
        //     toastContent: `Pairing of ${title} successful.`,
        //     recipeHistory: history
        // })

        // this.setState({
        //     toastShow: true,
        //     toastContent: `Pairing of ${title} successful.`,
        //     recipeHistory: history,
        //     updating: false
        // })

        axios.request(options).then(res => {
            this.setState({
                toastShow: true,
                toastContent: `Pairing of ${title} successful.`,
                recipeHistory: history,
                updating: false
            })
        }).catch(function (error) {
            console.error(error);
        });
    }

    currentRecipe = () => {
        return this.state.recipeHistory[this.state.recipeIndex] ?
            this.state.recipeHistory[this.state.recipeIndex] :
            emptyRecipe
    }

    wineStates = () => {
        if (!this.currentRecipe().wines)
            return []
        return this.currentRecipe().wines.map(wine => wine.state)
    }

    fbCategory = () => {
        let fbCats = ['dessert']
        return fbCats[Math.floor(Math.random() * fbCats.length)]
    }

    nextRecipe = async () => {
        let isFb = (this.state.recipeHistory.length + 1) % 4 === 0
        let category = isFb ? this.fbCategory() : 'seafood'

        this.setState({ loading: true })

        const recipeResponse = await axios.get(`${SERVER_URL}/api/v1/randomRecipe?category=${category}`)

        const options_2 = {
            method: 'POST',
            url: `https://pocketsommapi.azurewebsites.net/api/v1/recipeId2wineAi`,
            headers: { 'Content-Type': 'application/json' },
            data: { id: parseInt(recipeResponse.data.Recipe_id) }
        };

        let wineResponse = isFb ? await axios.request(options_2) : { data: null }

        console.log(recipeResponse.data.Cuisine)

        this.setState(oldState => ({
            loading: false,
            recipeHistory: [...oldState.recipeHistory, {
                id: recipeResponse.data.Recipe_id,
                title: recipeResponse.data.Recipe_title,
                regions: Object.entries(recipeResponse.data.Cuisine)
                    .sort(([, a], [, b]) => b - a).slice(0, 3).map(e => `${e[0]} ${Math.round(e[1] * 100)}%`),
                labels: recipeResponse.data.Category ? recipeResponse.data.Category.map(c => c.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())) : [],
                ingredients: recipeResponse.data.Ingredients.slice(2, -2).split("', '"),
                steps: recipeResponse.data.Steps,
                pairingText: '',
                paired: 0,
                wines: wineResponse.data,
                category: category
            }],
            recipeIndex: oldState.recipeIndex + 1,
            textBoxContent: ''
        }))
    }

    handleTextChange = text => {
        this.setState({ textBoxContent: text })

        // let recipeHistory = this.state.recipeHistory
        // recipeHistory[this.state.recipeIndex].pairingText = text

        // this.setState({ recipeHistory: recipeHistory })
    }

    listOfUrls = (text) => {
        return text.split(/\r?\n/).filter(l => this.isUrl(l))
    }

    pairingChanged = () => {
        return JSON.stringify(this.listOfUrls(this.state.textBoxContent)) !== JSON.stringify(this.listOfUrls(this.currentRecipe().pairingText))
    }

    submitButtonText = () => {
        if (!this.currentRecipe().pairingText) {
            return `Submit Pairings (${this.listOfUrls(this.state.textBoxContent).length})`
        } else if (
            !this.pairingChanged()
        ) {
            return 'Submitted'
        } else {
            return 'Update Pairings'
        }

        // return this.currentRecipe().paired ?
        //     'Update Pairings' :
        //     `Submit Pairings (${this.listOfUrls(this.state.textBoxContent).length})`
    }

    recomSubmitButtonText = () => {
        if (this.currentRecipe().recomSubmitted)
            return 'Submitted'
        else
            return 'Submit'
    }

    handleTextFieldSubmit = () => {
        this.submitRecipe(
            this.listOfUrls(this.state.textBoxContent).map(l => ({
                link: l,
                info: ''
            }))
        )
    }

    handleRecomStatesSubmit = () => {
        let history = this.state.recipeHistory

        let acceptedWines = this.currentRecipe().wines.filter(w => w.state === 'accepted').map(w => ({
            link: w.link,
            info: w.state
        }))

        this.submitRecipe(acceptedWines)

        history[this.state.recipeIndex].recomSubmitted = true
        this.setState({
            recipeHistory: history
        })
    }

    render() {
        return (
            <div className='nodrag' style={{ display: 'flex', height: 'calc(100vh - 80px)', width: '100%', backgroundColor: '#f0f0f0' }}>
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <Loadable style={{ marginTop: '300px' }} loading={this.state.loading} component={
                        <div id="page-body">
                            <Modal scrollable centered size="lg" show={this.state.show} onHide={this.handleClose}>
                                <Modal.Header>
                                    <Modal.Title>{this.currentRecipe().title}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <ListGroup variant="flush">
                                        {this.currentRecipe().steps.split(/\| [0-9]+\./).splice(1).map((step, i) =>
                                            <ListGroup.Item key={`recipe_step_${i}`}>
                                                <span style={{ display: 'block', marginBottom: '10px' }}>
                                                    <b>{i + 1}.</b> {step}
                                                </span>
                                            </ListGroup.Item>
                                        )}
                                    </ListGroup>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="danger" onClick={this.handleClose}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                            <Toast
                                onClose={() => this.setState({ toastShow: false })}
                                delay={8000}
                                animation
                                autohide
                                show={this.state.toastShow}
                                style={{
                                    position: 'absolute', right: '50px', top: '50px'
                                }}
                            >
                                <Toast.Header>
                                    <strong className="me-auto">PocketSomm</strong>
                                </Toast.Header>
                                <Toast.Body>{this.state.toastContent}</Toast.Body>
                            </Toast>

                            <Offcanvas placement="end" show={this.state.showHistory} onHide={this.handleCloseHistory}>
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title>Session History</Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <ListGroup variant="flush">
                                        {
                                            this.state.recipeHistory.map((r, i) =>
                                                <ListGroup.Item key={`recipe_history_${i}`} onClick={e => this.goToRecipe(i)} action>
                                                    {
                                                        this.state.recipeIndex === i ? <strong>{r.title}</strong> : <span>{r.title}</span>
                                                    }
                                                    {
                                                        // if recipe is FLASHBACK
                                                        r.wines ? <Badge style={{ float: 'right' }} bg="info">
                                                            RECAP
                                                        </Badge> : null
                                                    }
                                                    {
                                                        r.paired ? <Badge style={{ float: 'right' }} bg="success">
                                                            {r.wines ? 'Paired' : `${r.paired} Pairing${r.paired > 1 ? 's' : ''}`}
                                                        </Badge> : <Badge style={{ float: 'right' }} bg="secondary">
                                                            Unpaired
                                                        </Badge>
                                                    }
                                                </ListGroup.Item>
                                            )}
                                    </ListGroup>
                                </Offcanvas.Body>
                            </Offcanvas>



                            <div id="recipe-window" style={{ position: 'relative', width: '100%', height: 'calc((100vh - 80px))', paddingLeft: '60px', paddingRight: '60px' }}>
                                <Button variant="link" onClick={this.handleShowHistory} style={{ position: 'absolute', top: '10px', right: '10px', zIndex:10 }}>
                                    Session History
                                </Button>

                                <div style={{ width: '100%', height: '100px', paddingTop: '10px', position: 'relative' }}>
                                    <h4>
                                        {this.currentRecipe().title}
                                        {this.currentRecipe().wines ? <Badge bg="info" style={{ marginLeft: '20px' }}>
                                            RECAP
                                        </Badge> : null}
                                    </h4>
                                    <button className="btn btn-link" onClick={this.handleShow}>View steps</button>
                                    <div style={{ width: '100%', textAlign: 'start', height: '32px', display: 'flex', alignItems: 'center', position:'absolute', top:'10px' }}>
                                        {this.currentRecipe().regions.length ? this.currentRecipe().regions.map((r,i) =>
                                            <Tag key={`tag_${i}`} content={`${r}`} declinable={false} />
                                        ) : <span style={{ marginLeft: '30px', fontSize: '14px', color: 'darkgray' }}>None</span>}
                                    </div>
                                    {/* <div style={{ width: '100%', textAlign: 'start', height: '32px', display: 'flex', alignItems: 'center' }}>
                                        Predicted Categories: {this.currentRecipe().labels.length ? this.currentRecipe().labels.map(l =>
                                            <Tag content={`${l} `} declinable={true} />
                                        ) : <span style={{ marginLeft: '30px', fontSize: '14px', color: 'darkgray' }}>None</span>}
                                    </div> */}
                                </div>

                                <Card style={{ backgroundColor: '#f8f8f8', padding: '20px', height: 'calc(100% - 170px)', width: '400px', textAlign: 'start', float: 'left' }}>
                                    <Card.Title>Ingredient List</Card.Title>
                                    <Card.Body style={{ overflowY: 'auto' }}>
                                        {this.currentRecipe().ingredients.map((ing, i) =>
                                            <span key={`ingredient_${i}`} style={{ display: 'block' }}>• {ing}</span>)
                                        }
                                    </Card.Body>
                                </Card>

                                <div style={{ width: 'calc(100% - 400px)', height: 'calc(100% - 170px)', float: 'left', position: 'relative' }}>
                                    {
                                        this.currentRecipe().wines ?
                                            <div id="ai-recommendations" style={{
                                                float: 'left', width: '80%', height: '100%', paddingLeft: '20px', paddingRight: '10px', position: 'relative'
                                            }}>
                                                <Card style={{ width: '100%', height: '100%', padding: '20px', backgroundColor: '#f8f8f8' }}>
                                                    <Card.Title style={{ textAlign: 'left' }}>AI recommendations</Card.Title>
                                                    <Card.Body style={{}}>
                                                        {
                                                            this.currentRecipe().wines ? this.currentRecipe().wines.slice(0,4).map((wine, i) =>
                                                                <div key={`AI_wines_${i}`} style={{
                                                                    marginBottom: '10px'
                                                                }}>
                                                                    <div style={{ width: '65%', float: 'left', position: 'relative' }}>
                                                                        {
                                                                            wine.state ?
                                                                                <div style={{ width: '100%', height: '100%', position: 'absolute', backgroundColor: wine.state === 'accepted' ? 'green' : 'red', zIndex: 5, opacity: '20%' }}></div>
                                                                                : null
                                                                        }
                                                                        <WinePlate wine={wine} disabled={true} />
                                                                    </div>
                                                                    <div style={{ height: '90px', width: '15%', float: 'left', display: 'flex', alignContent: 'center', justifyItems: 'center' }}>
                                                                        <BsXLg
                                                                            style={{ alignSelf: 'center', marginLeft: '20px', opacity: wine.state === 'accepted' ? '30%' : '' }}
                                                                            color={wine.state === 'declined' ? 'darkred' : ''}
                                                                            className="clickable"
                                                                            size={wine.state === 'declined' ? 30 : 20}
                                                                            onClick={e => { this.handleWineCancel(i) }}
                                                                        />
                                                                        <BsCheckLg
                                                                            style={{ alignSelf: 'center', marginLeft: '20px', opacity: wine.state === 'declined' ? '30%' : '' }}
                                                                            color={wine.state === 'accepted' ? 'darkgreen' : ''}
                                                                            className="clickable"
                                                                            size={wine.state === 'accepted' ? 30 : 20}
                                                                            onClick={e => { this.handleWineAccept(i) }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            ) : <span style={{ color: 'gray' }}>No Recommendations.</span>
                                                        }
                                                        <Button
                                                            disabled={this.wineStates().some(e => !e) || this.recomSubmitButtonText() === 'Submitted'}
                                                            onClick={this.handleRecomStatesSubmit}
                                                            variant="danger"
                                                            style={{
                                                                position: 'absolute',
                                                                bottom: '15px',
                                                                right: '15px'
                                                            }}>
                                                            {
                                                                this.state.updating ? <Spinner animation="border" size='sm' style={{ marginRight: '5px' }} /> : null
                                                            }
                                                            {this.recomSubmitButtonText()}
                                                        </Button>
                                                    </Card.Body>
                                                </Card>
                                            </div> : null
                                    }
                                    {
                                        this.currentRecipe().wines ? null : <div id="pairing-window" style={{
                                            float: 'right',
                                            width: '50%',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column-reverse',
                                            alignItems: 'flex-end',
                                            paddingLeft: '10px'
                                        }}>
                                            <Form.Control
                                                onChange={e => this.handleTextChange(e.target.value)}
                                                value={this.state.textBoxContent}
                                                as="textarea"
                                                placeholder="Paste wine links here (one per row)"
                                                style={{ height: '190px', width: '100%' }}
                                            />

                                            <button style={{ float: 'right', marginBottom: '10px' }} disabled={
                                                !this.state.textBoxContent ||
                                                !this.isUrl(this.state.textBoxContent.split('\n')[0]) ||
                                                !this.pairingChanged()
                                            } type="button" className="btn btn-danger" onClick={this.handleTextFieldSubmit}>
                                                {
                                                    this.state.updating ? <Spinner animation="border" size='sm' style={{ marginRight: '5px' }} /> : null
                                                }
                                                {this.submitButtonText()}
                                            </button>
                                        </div>
                                    }
                                </div>
                            </div>

                            {/* <div id="pairing-window" style={{ width: 'calc((100vh - 80px)*0.35)', height: '30%' }}>
                                <Form.Control
                                    onChange={e => this.handleTextChange(e.target.value)}
                                    value={this.currentRecipe().pairingText}
                                    as="textarea"
                                    placeholder="Paste wine links here (one per row)"
                                    style={{ height: '190px', width: '650px', marginLeft: '40px', marginTop: '20px' }}
                                />
                            </div> */}
                        </div>
                    } />
                </div>

                <div style={{ position: 'absolute', width: '100%', bottom: '10px', fontSize: '25px', display: 'flex', justifyContent: 'center' }}>
                    <ChevronCompactLeft
                        style={{ opacity: this.state.recipeIndex && !this.state.loading ? '' : '20%' }}
                        onClick={this.handlePrevClick}
                        className={this.state.recipeIndex && !this.state.loading ? 'clickable' : ''}
                        size={40} />
                    <div style={{ width: '100px' }}>
                        <span>{this.state.recipeIndex + 1}/{this.state.recipeHistory.length}</span>
                    </div>
                    <ChevronCompactRight
                        style={{ opacity: !this.state.loading ? '' : '20%' }}
                        onClick={this.handleNextClick}
                        className={!this.state.loading ? 'clickable' : ''}
                        size={40} />
                </div>
            </div>
        )
    }
}

export default PairingTool;