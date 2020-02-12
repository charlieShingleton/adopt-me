import React from "react";
import PetAPI from "@frontendmasters/pet";

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    PetAPI.animal(this.props.id)
      .then(({ animal }) => {
        this.setState({
          name: animal.name,
          animal: animal.type,
          location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary
        });
      })
      .catch(e => console.error(e))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    if (this.state.loading) {
      return <h1>loading...</h1>;
    }

    const { animal, breed, location, description, name } = this.state;
    return (
      <div className="details">
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default Details;