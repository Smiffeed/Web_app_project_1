import React, { useState, useEffect } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const CarPicker = ({ cars, onFilter }) => {
  const [selectedBrand, setSelectedBrand] = useState("Any");
  const [selectedModel, setSelectedModel] = useState("Any");
  const [selectedYear, setSelectedYear] = useState("Any");
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    if (cars && cars.length > 0) {
      const uniqueBrands = Array.from(
        new Set(cars.map((car) => car.NameMMT.split(" ")[0]))
      ).sort();
      setBrands(["Any", ...uniqueBrands]);
    }
  }, [cars]);

  useEffect(() => {
    if (selectedBrand && selectedBrand !== "Any") {
      const filteredModels = Array.from(
        new Set(
          cars
            .filter((car) => car.NameMMT.startsWith(selectedBrand))
            .map((car) => car.NameMMT.split(" ")[1])
        )
      ).sort();
      setModels(["Any", ...filteredModels]);
    } else {
      setModels(["Any"]);
    }
  }, [selectedBrand, cars]);

  useEffect(() => {
    if (selectedModel && selectedModel !== "Any") {
      const filteredYears = Array.from(
        new Set(
          cars
            .filter(
              (car) =>
                car.NameMMT.startsWith(selectedBrand) &&
                car.NameMMT.split(" ")[1] === selectedModel
            )
            .map((car) => car.Yr)
        )
      ).sort((a, b) => b - a);
      setYears(["Any", ...filteredYears]);
    } else {
      setYears(["Any"]);
    }
  }, [selectedModel, selectedBrand, cars]);

  const handleSearch = (e) => {
    e.preventDefault();
  
    const filtered = cars.filter((car) => {
      const brandMatch = selectedBrand === "Any" || car.NameMMT.startsWith(selectedBrand);
      const modelMatch = selectedModel === "Any" || car.NameMMT.split(" ")[1] === selectedModel;
      const yearMatch = selectedYear === "Any" || car.Yr === parseInt(selectedYear, 10);
  
      return brandMatch && modelMatch && yearMatch;
    });
  
    console.log('Filtered Cars:', filtered);
    onFilter(filtered);
  };

  return (
    <div className="search-grid-wrapper">
      <form onSubmit={handleSearch} className="mb-4">
        <Row className="align-items-center justify-content-start">
          <Col xs={12} sm={3} className="mb-2">
            <DropdownButton
              as={ButtonGroup}
              id="brand-dropdown"
              size="lg"
              title={
                selectedBrand && selectedBrand !== "Any"
                  ? selectedBrand
                  : "Select Brand"
              }
              onSelect={(eventKey) => setSelectedBrand(eventKey)}
              className="custom-dropdown-button"
              style={{ height: "50px", width: "100%" }}
            >
              {brands.map((brand, index) => (
                <Dropdown.Item key={index} eventKey={brand}>
                  {brand}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
          <Col xs={12} sm={3} className="mb-2">
            <DropdownButton
              as={ButtonGroup}
              id="model-dropdown"
              size="lg"
              variant="secondary"
              title={
                selectedModel && selectedModel !== "Any"
                  ? selectedModel
                  : "Select Model"
              }
              onSelect={(eventKey) => setSelectedModel(eventKey)}
              className="w-100"
              style={{ height: "50px", width: "100%" }}
            >
              {models.map((model, index) => (
                <Dropdown.Item key={index} eventKey={model}>
                  {model}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
          <Col xs={12} sm={3} className="mb-2">
            <DropdownButton
              as={ButtonGroup}
              id="year-dropdown"
              size="lg"
              variant="secondary"
              title={
                selectedYear && selectedYear !== "Any"
                  ? selectedYear
                  : "Select Year"
              }
              onSelect={(eventKey) => setSelectedYear(eventKey)}
              className="w-100"
              style={{ height: "50px", width: "100%" }}
            >
              {years.map((year, index) => (
                <Dropdown.Item key={index} eventKey={year}>
                  {year}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
          <Col xs={12} sm={2} className="mb-2 text-center">
            <Button
              type="submit"
              className="btn custom-search-button"
              style={{ height: "50px", width: "100%" }}
            >
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default CarPicker;