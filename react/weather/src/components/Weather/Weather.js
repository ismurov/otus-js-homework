import React from 'react';
import { connect } from 'react-redux';
import './Weather.css';

class Weather extends React.Component {
  render() {
    return (
      <div className="Weather__info">
        { this.renderBody() }
      </div>
    );
  }
  renderBody() {
    const { temperature, city, country, humidity, description, iconUrl, error } = this.props;

    if (this.props.hasErrored) {
      return (
        <p className="Weather__error">
          { error || 'Sorry! There was an error loading the weather' }
        </p>
      );
    }

    if (this.props.isLoading) {
      return <p className="Weather__key">Loading…</p>;
    }
    return (
      <React.Fragment>
        {
          city && country && <p className="Weather__key"> Location: 
            <span className="Weather__value"> { city }, { country }</span>
          </p>
        }
        {
          temperature && <p className="Weather__key"> Temperature: 
            <span className="Weather__value"> { temperature }°C</span>
          </p>
        }
        {
          humidity && <p className="Weather__key"> Humidity: 
            <span className="Weather__value"> { humidity }%</span>
          </p>
        }
        {
          description && <p className="Weather__key"> Conditions:&nbsp;
            <span className="Weather__value"> 
              { description }
              { 
                iconUrl && <img src={ iconUrl } alt={ description }/>
              }
            </span>
          </p>
        }
      </React.Fragment>
    );
  }
};

const mapStateToProps = state => {
  const weather = state.weather;
  const { temperature, city, country, humidity, description, iconUrl } = weather.data;
  return {
    city,
    country,
    temperature,
    humidity,
    description,
    iconUrl,
    isLoading: weather.isLoading,
    hasErrored: weather.hasErrored,
    error: weather.error
  };
};

const WeatherContainer = connect(mapStateToProps)(Weather);

export default WeatherContainer;