import './PairingTool.scss';
import React from 'react';
import { Form, Modal, Button, ListGroup, Toast, Offcanvas, Badge, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { BsXLg } from "react-icons/bs";
import Tag from './Tag';
import Loadable from '../Loadable';
import { ChevronCompactLeft, ChevronCompactRight } from 'react-bootstrap-icons';


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
        var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression)

        if (text.match(regex)) {
            return true
        } else
            return false
    }

    submitRecipe() {
        const title = this.currentRecipe().title

        let history = this.state.recipeHistory
        history[this.state.recipeIndex].paired = this.listOfUrls(this.state.textBoxContent).length
        history[this.state.recipeIndex].pairingText = this.state.textBoxContent
        let isUpdate = this.state.recipeIndex + 1 !== this.state.recipeHistory.length

        const options = {
            method: 'POST',
            url: 'https://pocketsomm.dev/api/v1/recipePairing',
            headers: { 'Content-Type': 'application/json' },
            data: {
                wines: this.listOfUrls(this.state.textBoxContent).map(l => ({ link: l, info: '' })),
                recipeId: this.currentRecipe().id,
                recipeTitle: this.currentRecipe().title
            }
        };

        this.setState({ updating: true })

        // FOR TESTING
        // this.setState({
        //     toastShow: true,
        //     toastContent: `Pairing of ${title} successful.`,
        //     recipeHistory: history
        // })

        // this.setState({ updating: false })

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

    nextRecipe() {
        this.setState({ loading: true })
        axios.get('https://pocketsomm.dev/api/v1/randomRecipe').then(res => {
            this.setState(oldState => ({
                loading: false,
                recipeHistory: [...oldState.recipeHistory, {
                    id: res.data.Recipe_id,
                    title: res.data.Recipe_title,
                    labels: [],
                    regions: Object.entries(res.data.Cuisine)
                        .sort(([, a], [, b]) => b - a).slice(0, 3).map(e => `${e[0]} ${Math.round(e[1] * 100)}%`),
                    labels: res.data.Category ? res.data.Category.map(c => c.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())) : [],
                    ingredients: res.data.Ingredients.slice(2, -2).split("', '"),
                    steps: res.data.Steps,
                    pairingText: '',
                    paired: 0
                }],
                recipeIndex: oldState.recipeIndex + 1,
                textBoxContent: ''
            }))
        })
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
                                            <ListGroup.Item>
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
                                                <ListGroup.Item onClick={e => this.goToRecipe(i)} action>
                                                    {
                                                        this.state.recipeIndex == i ? <strong>>{r.title}</strong> : <span>{r.title}</span>
                                                    }
                                                    {
                                                        r.paired ? <Badge style={{ float: 'right' }} bg="success">
                                                            {r.paired} Pairings
                                                        </Badge> : <Badge style={{ float: 'right' }} bg="secondary">No Pairings</Badge>
                                                    }
                                                </ListGroup.Item>
                                            )}
                                    </ListGroup>
                                </Offcanvas.Body>
                            </Offcanvas>



                            <div id="recipe-window" style={{ position: 'relative', width: '100%', height: 'calc((100vh - 80px))', paddingLeft: '60px', paddingRight: '60px' }}>
                                <Button variant="link" onClick={this.handleShowHistory} style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                    Session History
                                </Button>

                                <div style={{ width: '100%', height: '180px', paddingTop: '10px' }}>
                                    <h4>{this.currentRecipe().title}</h4>
                                    <button class="btn btn-link" onClick={this.handleShow}>View steps</button>
                                    <div style={{ width: '100%', textAlign: 'start', height: '32px', display: 'flex', alignItems: 'center' }}>
                                        Predicted Regions: {this.currentRecipe().regions.length ? this.currentRecipe().regions.map(r =>
                                            <Tag content={`${r}`} declinable={true} />
                                        ) : <span style={{ marginLeft: '30px', fontSize: '14px', color: 'darkgray' }}>None</span>}
                                    </div>
                                    <div style={{ width: '100%', textAlign: 'start', height: '32px', display: 'flex', alignItems: 'center' }}>
                                        Predicted Categories: {this.currentRecipe().labels.length ? this.currentRecipe().labels.map(l =>
                                            <Tag content={`${l} `} declinable={true} />
                                        ) : <span style={{ marginLeft: '30px', fontSize: '14px', color: 'darkgray' }}>None</span>}
                                    </div>
                                </div>

                                <Card style={{ backgroundColor: '#f5f5f5', padding: '30px', width: '500px', textAlign: 'start', float: 'left', height: 'calc(100% - 290px)' }}>
                                    {/* <Card style={{padding:'20px'}}> */}
                                    <Card.Title>Ingredient List</Card.Title>
                                    <Card.Body style={{ overflowY: 'auto' }}>
                                        {this.currentRecipe().ingredients.map(i => <span style={{ display: 'block' }}>• {i}</span>)}
                                    </Card.Body>
                                    {/* </Card> */}
                                </Card>

                                <div style={{ width: 'calc(100% - 500px)', height: 'calc(100% - 290px)', float: 'left', position: 'relative' }}>
                                    <div style={{ width: '650px', position: 'absolute', bottom: '0px', right: '0px' }}>
                                        <button style={{ float: 'right', marginBottom: '10px' }} disabled={
                                            !this.state.textBoxContent ||
                                            !this.isUrl(this.state.textBoxContent.split('\n')[0]) ||
                                            !this.pairingChanged()
                                        } type="button" class="btn btn-danger" onClick={e => this.submitRecipe()}>
                                            {
                                                this.state.updating ? <Spinner animation="border" size='sm' style={{ marginRight: '5px' }} /> : null
                                            }
                                            {this.submitButtonText()}
                                        </button>
                                        <Form.Control
                                            onChange={e => this.handleTextChange(e.target.value)}
                                            value={this.state.textBoxContent}
                                            as="textarea"
                                            placeholder="Paste wine links here (one per row)"
                                            style={{ float: 'right', height: '190px', width: '650px' }}
                                        />
                                    </div>
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

                <div style={{ position: 'absolute', width: '100%', bottom: '25px', fontSize: '30px', display: 'flex', justifyContent: 'center' }}>
                    <ChevronCompactLeft
                        style={{ opacity: this.state.recipeIndex && !this.state.loading ? '' : '20%' }}
                        onClick={this.handlePrevClick}
                        className={this.state.recipeIndex && !this.state.loading ? 'clickable' : ''}
                        size={50} />
                    <div style={{ width: '100px' }}>
                        <span>{this.state.recipeIndex + 1}/{this.state.recipeHistory.length}</span>
                    </div>
                    <ChevronCompactRight
                        style={{ opacity: !this.state.loading ? '' : '20%' }}
                        onClick={this.handleNextClick}
                        className={!this.state.loading ? 'clickable' : ''}
                        size={50} />
                </div>
            </div>
        )
    }
}

export default PairingTool;