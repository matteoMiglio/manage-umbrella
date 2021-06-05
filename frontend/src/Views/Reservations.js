import React, { Component } from "react";
import { Row, Col, Button, Container } from 'reactstrap';
import ReservationsTable from '../components/ReservationsTable';
import ReservationsModal from '../components/ReservationsModal';
import ReservationsSearchBar from '../components/ReservationsSearchBar';
import axios from "axios";
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { GrFormAdd } from "react-icons/gr";

const mainButtonStyles = {
  backgroundColor: '#ab50e4',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
}

const actionButtonStyles = {
  backgroundColor: '#ab50e4'
}

class Reservations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
      modal: false,
      filterDate: new Date(),
      searchText: '',
      itemsUnpaid: false
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {

    let tmp = this.state.filterDate.toISOString();
    const filterDate = tmp.substring(0, tmp.indexOf('T'));

    axios
      .get("/api/reservations?date=" + filterDate)
      .then((res) => this.setState({ itemList: res.data }))
      .catch((err) => console.log(err));
  };

  handleSubmit = (item, method) => {
    this.toggle();

    if (method.includes("save")) {

      if (item.umbrella === "" || item.umbrella === "-") {
        item.umbrella = null;
      }
  
      if (item.id) {
        axios
          .put(`/api/reservations/${item.id}/`, item)
          .then((res) => this.refreshList());
        return;
      }

      axios
        .post("/api/reservations/", item)
        .then((res) => this.refreshList());
    }

    if (method.includes("print")) {
      const obj = {
        type: "reservation",
        beachLoungers: item.beachLoungers,
        umbrella: item.umbrella
      }
  
      axios
        .post("/api/print-ticket/", obj)
        .then((res) => console.log(res.data));
    }
  };

  toggle = () => {
    this.setState({ 
      modal: !this.state.modal 
    });
  };

  createItem = () => {
    let tmp = this.state.filterDate.toISOString();
    const newDate = tmp.substring(0, tmp.indexOf('T'));
    const item = { umbrella: "", 
                  customer: "",
                  beachLoungers: 1,
                  date: newDate, 
                  paid: false };

    this.setState({ 
      activeItem: item, 
      modal: !this.state.modal, 
      modal_title: "Crea nuova prenotazione" 
    });
  };

  editItem = (item) => {
    this.setState({ 
      activeItem: item, 
      modal: !this.state.modal, 
      modal_title: "Modifica prenotazione" 
    });
  };

  deleteItem = (item) => {
    axios
      .delete(`/api/reservations/${item.id}/`)
      .then((res) => this.refreshList());
  }

  handleFilterDateChange = (e) => {
    const date = new Date(e);
    this.setState({
      filterDate: date,
    });

    setTimeout(() => { this.refreshList() }, 50);
  }

  handleFilterTextChange = (text) => {
    this.setState({
      searchText: text,
    });
  }

  handleShowUnpaidChange = (paid) => {

    this.setState({
      itemsUnpaid: paid,
    });
  }

  renderFloatingActionButton = () => {
    return (
      <Fab
        mainButtonStyles={mainButtonStyles}
        // actionButtonStyles={actionButtonStyles}
        icon={<GrFormAdd />}
        event="click"
        onClick={() => this.createItem()}
        alwaysShowTitle={false}
      />
    );
  };

  render() {
    return (
      <Container fluid className="pt-5">
        <h1 className="text-black text-uppercase text-center my-4">Prenotazioni</h1>
        <Row>
          <Col sm={{ size: 11, offset: 1}} className='mb-3'>
            <ReservationsSearchBar onFilterDateChange={this.handleFilterDateChange}
                                   onFilterTextChange={this.handleFilterTextChange}
                                   onUnpaidItemsChange={this.handleShowUnpaidChange} 
                                   filterDate={this.state.filterDate}
                                   itemsUnpaid={this.state.itemsUnpaid}
                                   showAll={this.state.showAll} />
          </Col>
        </Row>
        <Row>
          <Col md={10} sm={6} className="mx-auto p-0">
            <ReservationsTable items={this.state.itemList}
                               searchText={this.state.searchText} 
                               itemsUnpaid={this.state.itemsUnpaid}
                               filterDate={this.state.filterDate} 
                               onEditButtonClick={this.editItem} 
                               onDeleteButtonClick={this.deleteItem} />
          </Col>
        </Row>
        {this.renderFloatingActionButton()}
        {this.state.modal ? (
          <ReservationsModal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={(item, method) => this.handleSubmit(item, method)}
            modal_title={this.state.modal_title}
          />
        ) : null}
      </Container>
    );
  }
}

export default Reservations;