import './PairingTool.scss';
import React from 'react';
import { Form, Modal, Button, ListGroup, Toast, Offcanvas, Badge, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { BsXLg, BsCheckLg } from "react-icons/bs";
import Loadable from '../Loadable';
import { ChevronCompactLeft, ChevronCompactRight } from 'react-bootstrap-icons';
import { SERVER_URL } from '../../App';
import WinePlate from '../WinePlate';

const emptyRecipe = {
    steps: '',
    ingredients: [],
    regions: [],
    labels: [],
    pairingText: ''
}

const testWines = [
    {
        "type": "red",
        "link": "https://www.alko.fi/en/products/438847/Santiago-1541-Gran-Reserva-Cabernet-Sauvignon-Syrah-Malbec-2020/",
        "name": "Santiago 1541 Gran Reserva Cabernet Sauvignon Syrah Malbec 2020",
        "pair": "party wine",
        "price": 10.99,
        "volume": "0.75 l",
        "tags": "['Red wine', 'Luscious & jammy']",
        "PRODUCT NUMBER": 438847,
        "ALCOHOL": 13.5,
        "SUGAR": 3,
        "ACIDS": 5.3,
        "ENERGY": 80,
        "PRICE / LITRE": "14.52 EUR",
        "MORE INFORMATION": null,
        "ADDITIONAL INFORMATION": null,
        "INGREDIENTS DECLARED BY THE PRODUCER": "Contains sulphites",
        "PACKAGING": "bottle",
        "CLOSURE": "metal screw cap",
        "PRODUCER": "TIB",
        "SUPPLIER": "Beverage Partners Finland",
        "SELECTION": "general selection",
        "text": "Red wines are best served slightly below room temperature, at 16–18°C. Chilling a bottle from room temperature to the perfect serving temperature takes about half an hour in a fridge.",
        "topNotch": "Wines with rich flavours and aromas are a good choice when serving meat dishes.\r\nTry with BBQ-marinated pork ribs, beef and vegetable skewers or T bone steaks.",
        "tips": "Any allergens possibly contained in the beverages are mentioned on the label. The manufacturer and importer of an alcoholic beverage are responsible for the quality and composition of an alcoholic beverage delivered for consumption, as well as for ensuring that the product and its labels and other product promotion are in accordance with the relevant provisions and regulations. Please note! The product image or vintage can differ from the distributed product.",
        "features": "Full-bodied, medium tannic, dark cherry notes, blueberry jam notes, ripe blackberry notes, cocoa notes \r\n",
        "region": "['Rapel', 'Chile', 'DO Rapel Valley']",
        "variety": "['Malbec', 'Syrah', 'Cabernet Sauvignon']",
        "acid": 0,
        "bodied": 3,
        "dry": 0,
        "sweet": 0,
        "tannic": 2,
        "fruits": 3,
        "flowers": 0,
        "spices": 0,
        "herbal": 0,
        "minerality": 0,
        "oak": 1,
        "fermentation_yeasts": 1,
        "autolytic": 0,
        "tertiary": 0,
        "fish_food": 0,
        "desserts_food": 0,
        "fruit_food": 1,
        "vegetables_food": 0,
        "sweet_food": 1,
        "salty_food": 0,
        "sour_food": 1,
        "bitter_food": 1,
        "beef_food": 0,
        "poultry_food": 0,
        "game_food": 0,
        "pork_food": 0,
        "dairy_food": 0,
        "fatty_food": 0,
        "lamb_food": 0,
        "nutty_food": 0,
        "box": 0,
        "dessert": 0,
        "red": 1,
        "rose": 0,
        "sparkling": 0,
        "white": 0,
        "name_year": "Santiago-1541-Gran-Reserva-Cabernet-Sauvignon-Syrah-Malbec-2020",
        "year": 2020,
        "type_2": "red",
        "country": "Chile",
        "quality": null,
        "cuisine": "South American"
    },
    {
        "type": "red",
        "link": "https://www.alko.fi/en/products/006614/Gato-Negro-Merlot-2020/",
        "name": "Gato Negro Merlot 2020",
        "pair": "chicken, turkey",
        "price": 7.99,
        "volume": "0.75 l",
        "tags": "['Red wine', 'Luscious & jammy']",
        "PRODUCT NUMBER": 6614,
        "ALCOHOL": 13,
        "SUGAR": 3,
        "ACIDS": 4.9,
        "ENERGY": 70,
        "PRICE / LITRE": "10.52 EUR",
        "MORE INFORMATION": null,
        "ADDITIONAL INFORMATION": null,
        "INGREDIENTS DECLARED BY THE PRODUCER": "Contains sulphites",
        "PACKAGING": "bottle",
        "CLOSURE": "metal screw cap",
        "PRODUCER": "Viña San Pedro",
        "SUPPLIER": "Pernod Ricard Finland",
        "SELECTION": "general selection",
        "text": "Red wines are best served slightly below room temperature, at 16–18°C. Chilling a bottle from room temperature to the perfect serving temperature takes about half an hour in a fridge.",
        "topNotch": "Wines with rich flavours and aromas are a good choice when serving meat dishes.\r\nTry with BBQ-marinated pork ribs, beef and vegetable skewers or T bone steaks.",
        "tips": "Any allergens possibly contained in the beverages are mentioned on the label. The manufacturer and importer of an alcoholic beverage are responsible for the quality and composition of an alcoholic beverage delivered for consumption, as well as for ensuring that the product and its labels and other product promotion are in accordance with the relevant provisions and regulations. Please note! The product image or vintage can differ from the distributed product.",
        "features": "Medium-bodied, medium tannic, blackberry notes, plum notes, cherry notes, light mocha notes \r\n",
        "region": "['Wine of Chile', 'Others', 'Chile']",
        "variety": "['Merlot']",
        "acid": 0,
        "bodied": 2,
        "dry": 0,
        "sweet": 0,
        "tannic": 2,
        "fruits": 3,
        "flowers": 0,
        "spices": 0,
        "herbal": 1,
        "minerality": 0,
        "oak": 0,
        "fermentation_yeasts": 0,
        "autolytic": 0,
        "tertiary": 0,
        "fish_food": 0,
        "desserts_food": 0,
        "fruit_food": 0,
        "vegetables_food": 0,
        "sweet_food": 0,
        "salty_food": 1,
        "sour_food": 0,
        "bitter_food": 0,
        "beef_food": 0,
        "poultry_food": 1,
        "game_food": 0,
        "pork_food": 0,
        "dairy_food": 0,
        "fatty_food": 0,
        "lamb_food": 0,
        "nutty_food": 0,
        "box": 0,
        "dessert": 0,
        "red": 1,
        "rose": 0,
        "sparkling": 0,
        "white": 0,
        "name_year": "Gato-Negro-Merlot-2020",
        "year": 2020,
        "type_2": "red",
        "country": "Chile",
        "quality": null,
        "cuisine": "South American"
    },
    {
        "type": "white",
        "link": "https://www.alko.fi/en/products/925317/Llai-Llai-Sauvignon-Blanc-2015/",
        "name": "Llai Llai Sauvignon Blanc 2015",
        "pair": "salads, vegetarian food",
        "price": 11.21,
        "volume": "0.75 l",
        "tags": "['White wine', 'Nuanced & structured']",
        "PRODUCT NUMBER": 925317,
        "ALCOHOL": 13,
        "SUGAR": 3,
        "ACIDS": 6.1,
        "ENERGY": 70,
        "PRICE / LITRE": "14.95 EUR",
        "MORE INFORMATION": null,
        "ADDITIONAL INFORMATION": null,
        "INGREDIENTS DECLARED BY THE PRODUCER": "Contains sulphites",
        "PACKAGING": "bottle",
        "CLOSURE": "metal screw cap",
        "PRODUCER": "Dos Andes",
        "SUPPLIER": "Vinum Import Oy",
        "SELECTION": "sale-to-order selection",
        "text": "White wines are best served chilled, at 10–12°C. Chilling a bottle from room temperature to the perfect serving temperature takes about two hours in a fridge. The sweeter the wine, the cooler it can be served.",
        "topNotch": "Nuanced flavours combined with robust acidity make these wines an excellent match for fish and seafood dishes as well as slightly stronger flavours.\r\nTry with Finnish crayfish, clam dishes or blinis.",
        "tips": "Any allergens possibly contained in the beverages are mentioned on the label. The manufacturer and importer of an alcoholic beverage are responsible for the quality and composition of an alcoholic beverage delivered for consumption, as well as for ensuring that the product and its labels and other product promotion are in accordance with the relevant provisions and regulations. Please note! The product image or vintage can differ from the distributed product.",
        "features": "Dry, acidic, citrus notes, fruity, herbal notes, aromatic \r\n",
        "region": "['Bío Bío', 'Chile', 'Valle del Bío Bío']",
        "variety": "['Sauvignon Blanc']",
        "acid": 3,
        "bodied": 0,
        "dry": 3,
        "sweet": 0,
        "tannic": 0,
        "fruits": 1,
        "flowers": 0,
        "spices": 0,
        "herbal": 1,
        "minerality": 0,
        "oak": 0,
        "fermentation_yeasts": 0,
        "autolytic": 0,
        "tertiary": 0,
        "fish_food": 0,
        "desserts_food": 0,
        "fruit_food": 0,
        "vegetables_food": 1,
        "sweet_food": 1,
        "salty_food": 1,
        "sour_food": 1,
        "bitter_food": 1,
        "beef_food": 0,
        "poultry_food": 0,
        "game_food": 0,
        "pork_food": 0,
        "dairy_food": 1,
        "fatty_food": 0,
        "lamb_food": 0,
        "nutty_food": 1,
        "box": 0,
        "dessert": 0,
        "red": 0,
        "rose": 0,
        "sparkling": 0,
        "white": 1,
        "name_year": "Llai-Llai-Sauvignon-Blanc-2015",
        "year": 2015,
        "type_2": "white",
        "country": "Chile",
        "quality": null,
        "cuisine": "South American"
    },
    {
        "type": "sparkling",
        "link": "https://www.alko.fi/en/products/939752/Belvino-Vino-Ros-Extra-Dry/",
        "name": "Belvino Vino Rosé Extra Dry",
        "pair": "party wine",
        "price": 9.98,
        "volume": "0.75 l",
        "tags": "['Sparkling wine & champagne', 'Smooth & light']",
        "PRODUCT NUMBER": 939752,
        "ALCOHOL": 11,
        "SUGAR": 11,
        "ACIDS": 5.1,
        "ENERGY": 70,
        "PRICE / LITRE": "13.17 EUR",
        "MORE INFORMATION": null,
        "ADDITIONAL INFORMATION": null,
        "INGREDIENTS DECLARED BY THE PRODUCER": "Contains sulphites",
        "PACKAGING": "bottle",
        "CLOSURE": "natural cork",
        "PRODUCER": "Enoitalia",
        "SUPPLIER": "Servaali",
        "SELECTION": "general selection",
        "text": "Sparkling wines made using the traditional method are served well-chilled, at 8–12°C. Fresh, crisp sparkling wines are served slightly cooler, at 6–8°C. A sparkling wine stopper will keep the bubbles in the bottle for several days, as long as the bottle is stored in the fridge. The fuller the bottle, the longer the bubbles will last. Using a gel cooler stored in the freezer, you can chill a bottle from room temperature to the perfect serving temperature in about 20 minutes. In a large cooler or bucket filled with ice cubes and water, you can chill a bottle in 15 minutes.",
        "topNotch": "Sparkling wines and Champagnes are ideal for toasting, as aperitifs, for socialising or for serving throughout a meal.",
        "tips": "Any allergens possibly contained in the beverages are mentioned on the label. The manufacturer and importer of an alcoholic beverage are responsible for the quality and composition of an alcoholic beverage delivered for consumption, as well as for ensuring that the product and its labels and other product promotion are in accordance with the relevant provisions and regulations. Please note! The product image or vintage can differ from the distributed product.",
        "features": "Dry, medium acidic, citrus notes, whitecurrant notes, light raspberry notes, hint of herb \r\n",
        "region": "['Italy']",
        "variety": "[]",
        "acid": 2,
        "bodied": 0,
        "dry": 3,
        "sweet": 0,
        "tannic": 0,
        "fruits": 3,
        "flowers": 0,
        "spices": 0,
        "herbal": 1,
        "minerality": 0,
        "oak": 0,
        "fermentation_yeasts": 0,
        "autolytic": 0,
        "tertiary": 0,
        "fish_food": 0,
        "desserts_food": 0,
        "fruit_food": 1,
        "vegetables_food": 0,
        "sweet_food": 1,
        "salty_food": 0,
        "sour_food": 1,
        "bitter_food": 1,
        "beef_food": 0,
        "poultry_food": 0,
        "game_food": 0,
        "pork_food": 0,
        "dairy_food": 0,
        "fatty_food": 0,
        "lamb_food": 0,
        "nutty_food": 0,
        "box": 0,
        "dessert": 0,
        "red": 0,
        "rose": 0,
        "sparkling": 1,
        "white": 0,
        "name_year": "Belvino-Vino-Ros-Extra-Dry",
        "year": 0,
        "type_2": "sparkling",
        "country": "Italy",
        "quality": null,
        "cuisine": "Italian"
    }
]

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

    submitRecipe() {
        const title = this.currentRecipe().title

        let history = this.state.recipeHistory
        history[this.state.recipeIndex].paired = this.listOfUrls(this.state.textBoxContent).length
        history[this.state.recipeIndex].pairingText = this.state.textBoxContent
        // let isUpdate = this.state.recipeIndex + 1 !== this.state.recipeHistory.length

        const options = {
            method: 'POST',
            url: `${SERVER_URL}/api/v1/recipePairing`,
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

        this.setState({
            toastShow: true,
            toastContent: `Pairing of ${title} successful.`,
            recipeHistory: history,
            updating: false
        })

        axios.request(options).then(res => {
            // this.setState({
            //     toastShow: true,
            //     toastContent: `Pairing of ${title} successful.`,
            //     recipeHistory: history,
            //     updating: false
            // })
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

    nextRecipe() {
        this.setState({ loading: true })
        axios.get(`${SERVER_URL}/api/v1/randomRecipe`).then(res => {
            this.setState(oldState => ({
                loading: false,
                recipeHistory: [...oldState.recipeHistory, {
                    id: res.data.Recipe_id,
                    title: res.data.Recipe_title,
                    regions: Object.entries(res.data.Cuisine)
                        .sort(([, a], [, b]) => b - a).slice(0, 3).map(e => `${e[0]} ${Math.round(e[1] * 100)}%`),
                    labels: res.data.Category ? res.data.Category.map(c => c.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())) : [],
                    ingredients: res.data.Ingredients.slice(2, -2).split("', '"),
                    steps: res.data.Steps,
                    pairingText: '',
                    paired: 0,
                    wines: testWines,
                }],
                recipeIndex: oldState.recipeIndex + 1,
                textBoxContent: ''
            }))
        }).catch(err=>{
            console.log(err)
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

    recomSubmitButtonText = () => {
        if (this.currentRecipe().recomSubmitted)
            return 'Submitted'
        else
            return 'Submit'
    }

    handleRecomStatesSubmit = () => {
        let history = this.state.recipeHistory
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
                                                        this.state.recipeIndex === i ? <strong>{r.title}</strong> : <span>{r.title}</span>
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

                                <div style={{ width: '100%', height: '100px', paddingTop: '10px' }}>
                                    <h4>{this.currentRecipe().title}</h4>
                                    <button class="btn btn-link" onClick={this.handleShow}>View steps</button>
                                    {/* <div style={{ width: '100%', textAlign: 'start', height: '32px', display: 'flex', alignItems: 'center' }}>
                                        Predicted Regions: {this.currentRecipe().regions.length ? this.currentRecipe().regions.map(r =>
                                            <Tag content={`${r}`} declinable={true} />
                                        ) : <span style={{ marginLeft: '30px', fontSize: '14px', color: 'darkgray' }}>None</span>}
                                    </div>
                                    <div style={{ width: '100%', textAlign: 'start', height: '32px', display: 'flex', alignItems: 'center' }}>
                                        Predicted Categories: {this.currentRecipe().labels.length ? this.currentRecipe().labels.map(l =>
                                            <Tag content={`${l} `} declinable={true} />
                                        ) : <span style={{ marginLeft: '30px', fontSize: '14px', color: 'darkgray' }}>None</span>}
                                    </div> */}
                                </div>

                                <Card style={{ backgroundColor: '#f8f8f8', padding: '20px', height: 'calc(100% - 210px)', width: '400px', textAlign: 'start', float: 'left' }}>
                                    <Card.Title>Ingredient List</Card.Title>
                                    <Card.Body style={{ overflowY: 'auto' }}>
                                        {this.currentRecipe().ingredients.map(i => <span style={{ display: 'block' }}>• {i}</span>)}
                                    </Card.Body>
                                </Card>

                                <div style={{ width: 'calc(100% - 400px)', height: 'calc(100% - 210px)', float: 'left', position: 'relative' }}>
                                    {/* <div id="ai-recommendations" style={{ float: 'left', width: '50%', height: '100%', paddingLeft: '20px', paddingRight: '10px' }}>
                                        <Card style={{ width: '100%', height: '100%', padding: '20px', backgroundColor: '#f8f8f8' }}>
                                            <Card.Title style={{ textAlign: 'left' }}>AI recommendations</Card.Title>
                                            <Card.Body style={{ overflowY: 'auto' }}>
                                                {
                                                    testWines ? testWines.map((wine, i) =>
                                                        <div style={{
                                                            marginBottom: '10px'
                                                        }}>
                                                            <div style={{ width: '85%', float: 'left', position: 'relative' }}>
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
                                                    ) : <span style={{color:'gray'}}>No Recommendations.</span>
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
                                                    {this.recomSubmitButtonText()}
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </div> */}
                                    <div id="pairing-window" style={{
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
                                        } type="button" class="btn btn-danger" onClick={e => this.submitRecipe()}>
                                            {
                                                this.state.updating ? <Spinner animation="border" size='sm' style={{ marginRight: '5px' }} /> : null
                                            }
                                            {this.submitButtonText()}
                                        </button>
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