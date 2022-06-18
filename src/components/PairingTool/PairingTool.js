import './PairingTool.scss';
import React from 'react';
import { Form, Modal, Button, ListGroup, Toast, Offcanvas, Badge, Card, Spinner, ProgressBar, Navbar, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import { BsXLg, BsCheckLg } from "react-icons/bs";
import Loadable from '../Loadable';
import { ChevronCompactLeft, ChevronCompactRight } from 'react-bootstrap-icons';
import { SERVER_URL } from '../../App';
import WinePlate from '../WinePlate';
import Tag from './Tag';
import ContentCard from './ContentCard';

const emptyRecipe = {
    steps: '',
    thumbnails: [],
    ingredients: [],
    regions: [],
    labels: [],
    pairingText: '',
    similarWines: []
}

const categories_all = ['dessert', 'seafood', 'meat', 'soup', 'vegetarian']
const categories_active = ['meat', 'soup', 'vegetarian']

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
            textBoxContent: '',
            similarWines: [],
            loadingRecommended: false,
            progression: [],
            category: categories_active[0]
        }

        this.pairingChanged = this.pairingChanged.bind(this)
        this.wineStates = this.wineStates.bind(this)
    }

    componentDidMount() {
        axios.get(`${SERVER_URL}/api/pairingtool/getPairingStats`).then(res => {
            console.log(res)
        })
        this.nextRecipe()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.textBoxContent !== this.state.textBoxContent) {
            this.fetchSimilarWines(
                this.listOfUrls(this.state.textBoxContent)
            )
        }
        if (prevState.similarWines !== this.state.similarWines) {
            this.setState({
                loadingRecommended: false
            })
        }
    }

    handleClose = () => this.setState({ show: false })
    handleShow = () => this.setState({ show: true })
    handleCloseHistory = () => this.setState({ showHistory: false })
    handleShowHistory = () => this.setState({ showHistory: true })

    goToRecipe = (index) => {
        const textBoxContent = this.state.recipeHistory[index].pairingText
        this.setState({
            recipeIndex: index,
            textBoxContent: textBoxContent,
            similarWines: []
        })
        this.fetchSimilarWines(this.listOfUrls(textBoxContent))
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
            url: `${SERVER_URL}/api/pairingtool/recipePairing`,
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
        let fbCats = [
            'dessert',
            // 'fish', 
            'seafood'
        ]
        return fbCats[Math.floor(Math.random() * fbCats.length)]
    }

    nextRecipe = async () => {
        // let isFb = (this.state.recipeHistory.length + 1) % 4 === 0
        // let category = isFb ? this.fbCategory() : 'meat'

        let category = this.state.category
        let isFb = !categories_active.includes(category)

        this.setState({ loading: true })

        const recipeResponse = await axios.get(`${SERVER_URL}/api/pairingtool/randomRecipe?category=${category}`)

        const options_2 = {
            method: 'POST',
            url: `${SERVER_URL}/api/v1/recipeId2wineAi?category=${category}`,
            headers: { 'Content-Type': 'application/json' },
            data: { id: parseInt(recipeResponse.data.Recipe_id) }
        };

        let wineResponse = isFb ? await axios.request(options_2) : { data: null }

        let progression = await axios.request({
            method: 'GET',
            url: `${SERVER_URL}/api/pairingtool/getPairingStats`,
            // headers: { 'Content-Type': 'application/json' },
            // data: { id: parseInt(recipeResponse.data.Recipe_id) }
        })

        // console.log(recipeResponse.data.Cuisine)
        // console.log(recipeResponse.data)
        // console.log(progression.data.counts.find(e => e._id === category).count)

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
                wines: wineResponse.data ? wineResponse.data.slice(0, 4) : wineResponse.data,
                category: category,
                thumbnails: recipeResponse.data.thumbnails
            }],
            recipeIndex: oldState.recipeIndex + 1,
            textBoxContent: '',
            similarWines: [],
            progression: progression.data.counts
        }))
    }

    getProgression = () => {
        const cat = this.state.progression.find(e => e._id === this.state.category)
        return cat ? cat.count : null
    }

    handleTextChange = text => {
        this.setState({ textBoxContent: text.replace(/\n+/, '\n') })

        console.log(this.listOfUrls(text))

        if (this.listOfUrls(text).length)
            this.fetchSimilarWines(this.listOfUrls(text))
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

        let acceptedWines = this.currentRecipe().wines.map(w => ({
            link: w.link,
            info: w.state
        }))

        // console.log(acceptedWines)

        this.submitRecipe(acceptedWines)

        history[this.state.recipeIndex].recomSubmitted = true
        this.setState({
            recipeHistory: history
        })
    }

    fetchSimilarWines = (urls) => {
        if (!urls.length) {
            this.setState({
                loadingRecommended: false,
                similarWines: []
            })
            return
        }
        this.setState({
            loadingRecommended: true
        })
        axios.post(`${SERVER_URL}/api/pairingtool/similarWinesByLink`, {
            wineLinks: urls
        }).then(res => {
            this.setState({
                similarWines: res.data
            })
            // console.log(res.data)
        }).catch(err => {
            console.error('Fetching similar wines failed', err)
        })
    }

    addSimilarWine = (wine) => {
        const updatedList = this.state.textBoxContent + '\n' + wine.link
        this.setState({
            textBoxContent: updatedList
        })
        this.fetchSimilarWines(this.listOfUrls(updatedList))
    }

    similarWinesList = () => {
        return this.state.similarWines.filter(wine => !this.listOfUrls(this.state.textBoxContent).includes(wine.link)).map(
            wine => <div style={{ width: '100%'}}>
                <div style={{ width: 'calc(100% - 100px)', float: 'left', height: '90px' }}>
                    <WinePlate wine={wine} disabled={true} />
                </div>
                <div style={{ width: '100px', height: '90px', float: 'left', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button onClick={() => { this.addSimilarWine(wine) }} size='sm' variant='danger'>
                        Add
                    </Button>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div style={{ height: '100vh', width: '100%', backgroundColor: '#f0f0f0' }}>
                <div id='navbar' style={{ position: 'relative', width: '100%', height: '40px', backgroundColor: 'black' }}>
                    <div style={{
                        position: 'absolute',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        left: '20px',
                        top: '0px',
                        height: '100%',
                        width: '300px'
                    }}>
                        <span style={{ color: 'white', marginRight: '10px', fontSize: '14px' }}>
                            Pairing:
                        </span>
                        <Form.Select onChange={e => {
                            this.setState({ category: e.target.value })
                        }} defaultValue={categories_active[0]} size='sm' style={{
                            width: '225px',
                            backgroundColor: '#1c1c1c',
                            color: 'white',
                            borderWidth: '0px'
                        }}>
                            {/* <option></option> */}
                            {
                                categories_all.map(
                                    category => <option value={category}>
                                        {!categories_active.includes(category) ? '📝 (checking) ' : '🧠 (pairing) '}
                                        {category.toUpperCase()}
                                    </option>
                                )
                            }
                        </Form.Select>
                    </div>
                    <img
                        alt="logo"
                        style={{
                            objectFit: 'cover',
                            position: 'absolute',
                            left: '0px',
                            right: '0px',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}
                        // onClick={e => { window.location.replace('/') }}
                        className="clickable nodrag"
                        src="PocketSomm.LOGO.svg"
                        width='120px'
                        height='40px'
                    >
                    </img>
                </div>
                <div style={{ height: '16px', marginBottom: '4px', width: '100%', visibility: this.getProgression() ? 'visible' : 'hidden' }}>
                    <ProgressBar
                        style={{ borderRadius: '0px', height: '12px' }}
                        variant='danger'
                        now={(parseInt(this.getProgression()) / 300) * 100}
                        // striped
                        // animated
                        label={`${this.state.category} pairings: ${this.getProgression()} / 300`}
                    />
                </div>
                <div style={{ width: '100%', height: 'calc(100% - 60px)', position: 'relative' }}>
                    <Loadable style={{ marginTop: '300px' }} loading={this.state.loading} component={
                        <div id="page-body">
                            <Modal scrollable centered size="lg" show={this.state.show} onHide={this.handleClose}>
                                <Modal.Header>
                                    <Modal.Title>{this.currentRecipe().title}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div style={{ width: '100%', height: '200px', display: 'flex', padding: '20px' }}>
                                        {
                                            this.currentRecipe().thumbnails.map(
                                                (thumb, i) => <img
                                                    style={{ margin: '5px' }}
                                                    key={`recipe_thumb_${i}`}
                                                    alt={`recipe_thumb_${i}`}
                                                    src={thumb}
                                                />
                                            )
                                        }
                                    </div>
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
                                    position: 'absolute', right: '50px', top: '50px', zIndex: 9999
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



                            <div id="recipe-window" style={{ position: 'relative', width: '100%', height: 'calc(100vh - 60px)', paddingLeft: '60px', paddingRight: '60px' }}>
                                <Button variant="link" onClick={this.handleShowHistory} style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}>
                                    Session History
                                </Button>

                                <div id='title-header' style={{ width: '100%', height: '100px', paddingTop: '10px', position: 'relative' }}>
                                    <h4>
                                        {this.currentRecipe().title}
                                        {this.currentRecipe().wines ? <Badge bg="info" style={{ marginLeft: '20px' }}>
                                            RECAP
                                        </Badge> : null}
                                    </h4>
                                    <button className="btn btn-link" onClick={this.handleShow}>View detail</button>
                                    <div style={{ width: '100%', textAlign: 'start', height: '32px', display: 'flex', alignItems: 'center', position: 'absolute', top: '10px' }}>
                                        {this.currentRecipe().regions.length ? this.currentRecipe().regions.map((r, i) =>
                                            <Tag key={`tag_${i}`} content={`${r}`} declinable={false} />
                                        ) : <span style={{ marginLeft: '30px', fontSize: '14px', color: 'darkgray' }}>None</span>}
                                    </div>
                                    {/* <div style={{ width: '100%', textAlign: 'start', height: '32px', display: 'flex', alignItems: 'center' }}>
                                        Predicted Categories: {this.currentRecipe().labels.length ? this.currentRecipe().labels.map(l =>
                                            <Tag content={`${l} `} declinable={true} />
                                        ) : <span style={{ marginLeft: '30px', fontSize: '14px', color: 'darkgray' }}>None</span>}
                                    </div> */}
                                </div>

                                <ContentCard id='ing-list' style={{ height: 'calc(100% - 170px)', width: '400px', float: 'left' }}>
                                    <Card.Title>Ingredient List 🗒️</Card.Title>
                                    <Card.Body style={{ overflowY: 'auto', fontSize: '14px' }}>
                                        {this.currentRecipe().ingredients.map((ing, i) =>
                                            <span key={`ingredient_${i}`} style={{ display: 'block' }}>• {ing}</span>)
                                        }
                                    </Card.Body>
                                </ContentCard>

                                <div id='feedback-window' style={{ width: 'calc(100% - 400px)', height: 'calc(100% - 170px)', float: 'left', position: 'relative' }}>
                                    {
                                        this.currentRecipe().wines ?
                                            <ContentCard style={{ height: '100%', width: '1000px' }}>
                                                <Card.Title style={{ textAlign: 'left' }}>Recommended wines (AI)</Card.Title>
                                                <Card.Body>
                                                    {
                                                        this.currentRecipe().wines ? this.currentRecipe().wines.map((wine, i) =>
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
                                            </ContentCard> : <ContentCard
                                                style={{
                                                    width: 'calc(100% - 500px)',
                                                    float: 'left',
                                                    height: '100%',
                                                }}>
                                                <Card.Title>
                                                    Recommended wines (similar properties)
                                                </Card.Title>
                                                <div style={{ height: '100%', width: '100%', overflowY: 'auto' }}>
                                                    <Loadable style={{ width: '30px', height: '30px' }} loading={this.state.loadingRecommended} component={
                                                        <div>
                                                            {
                                                                this.state.similarWines.length ? this.similarWinesList() : <div style={{
                                                                    color: 'gray',
                                                                    fontSize: '13px'
                                                                }}>
                                                                    Add some wine links to Input Window. Our software will then fetch similar wines for easier input.
                                                                </div>
                                                            }
                                                        </div>
                                                    } />
                                                </div>
                                            </ContentCard>

                                    }
                                    {
                                        this.currentRecipe().wines ? null : <ContentCard id="pairing-window" style={{
                                            float: 'right',
                                            width: '500px',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-end',
                                            padding: '5px'
                                        }}>
                                            <Card.Title style={{ marginBottom: '20px' }}>
                                                Input Window
                                            </Card.Title>
                                            <Form.Control
                                                onChange={e => this.handleTextChange(e.target.value)}
                                                value={this.state.textBoxContent}
                                                as="textarea"
                                                placeholder="Paste wine links here (one per row)"
                                                style={{ height: '400px', width: '100%', fontSize: '14px' }}
                                            />

                                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                                <button style={{ marginTop: '20px' }} disabled={
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
                                        </ContentCard>
                                    }
                                </div>
                            </div>
                        </div>
                    } />
                </div>

                <div className='nodrag' style={{
                    position: 'absolute',
                    width: '100%',
                    bottom: '10px',
                    fontSize: '25px',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    {
                        // this.state.progression !== null && !this.state.loading ?
                        //     <Card bg='dark' style={{ height: '100%', width: '300px', position: 'absolute', left: '70px', bottom: '20px', color: 'white' }}>
                        //         {/* {this.state.progression} */}
                        //         <span style={{ fontSize: '15px' }}>
                        //             {this.currentRecipe().category} pairings
                        //         </span>
                        //         <ProgressBar
                        //             variant='danger'
                        //             now={(parseInt(this.state.progression) / 300) * 100}
                        //             striped
                        //             animated
                        //             label={`${this.state.progression} / 300`}
                        //         />
                        //     </Card> :
                        //     null
                    }

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
            </div >
        )
    }
}

export default PairingTool;