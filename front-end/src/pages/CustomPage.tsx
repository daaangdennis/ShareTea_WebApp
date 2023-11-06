import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Cart,
  ToppingsGridProps,
  listProductToppings,
  product,
  topping,
} from "../types/types";
import { useRecoilState, useRecoilValue } from "recoil";
import { cart } from "../atoms/cart";
import "../styles/CustomPage.css";
import { Products } from "../atoms/product";
var _ = require("lodash");

function CustomPage() {
  const location = useLocation();
  const product: product = location.state && location.state.data;

  const [cartItems, setcartItems] = useRecoilState<Cart>(cart);
  const sourceProducts = useRecoilValue<listProductToppings>(Products);
  const [selectedIceLevel, setSelectedIceLevel] = useState<string>("");
  const [selectedSugarLevel, setSelectedSugarLevel] = useState<string>("");
  const [listToppings, setListToppings] = useState<topping[]>([]);
  const [note, setNote] = useState<string>("");

  const addProductToCart = () => {
    const newlist: Cart = _.cloneDeep(cartItems);
    newlist.items.push({
      product: product,
      toppings: listToppings,
      notes: note,
      ice_level: selectedIceLevel,
      sugar_level: selectedSugarLevel,
    });
    newlist.total = newlist.total + product.price + listToppings.length*0.75;
    setcartItems(newlist);
  };

  const handleIceLevelChange = (event: any) => {
    setSelectedIceLevel(event.target.value);
  };

  const handleSugarLevelChange = (event: any) => {
    setSelectedSugarLevel(event.target.value);
  };

  const handleNoteChange = (event: any) => {
    setNote(event.target.value);
  };

  const iceLevel = [
    "Select Ice Level",
    "No Ice",
    "Light Ice",
    "Regular Ice",
    "Extra Ice",
    "MAKE IT HOT",
  ];
  const sugarLevel = [
    "Select Sugar Level",
    "No Sugar",
    "30% Sugar",
    "50% Sugar",
    "80% Sugar",
    "100% Sugar",
    "120% Sugar",
  ];

  // const toppings = {
  //   items: ["item1", "item2", "item3", "item4", "item5", "item6"],
  //   price: 0.75,
  // };

  return (
    <div className="container-fluid">
      <div className="row custompage-drink-information mb-4">
        <div className="col-md-4 text-center my-4 px-0">
          <img
            width="60%"
            style={{
              objectFit: "contain",
              border: "2px solid white",
              borderRadius: "15px",
              backgroundColor: "white",
            }}
            src={product.url}
            alt={product.name}
          />
        </div>
        <div className="col-md-8 px-0 my-4 text-center text-md-start custompage-drink-information-text">
          <h1>
            {product.name}
            <br></br>
            ${(product.price + listToppings.length*0.75).toFixed(2)}
          </h1>
        </div>
      </div>

      <div className="row mx-2 mx-md-4 custompage-customization-container">
        <h1>Customization</h1>
        <div className="col-md-4">
          {iceLevel && product.has_ice && (
            <div>
              <h2>Ice Level</h2>
              <select
                value={selectedIceLevel}
                onChange={handleIceLevelChange}
                className="form-control-lg custompage-dropdown"
              >
                {iceLevel.map((level: string, i: number) => (
                  <option key={i}>{level}</option>
                ))}
              </select>
            </div>
          )}

          <br></br>

          {sugarLevel && product.has_sugar && (
            <div>
              <h2>Sugar Level</h2>
              <select
                value={selectedSugarLevel}
                onChange={handleSugarLevelChange}
                className="form-control-lg custompage-dropdown"
              >
                {sugarLevel.map((level: string, i: number) => (
                  <option key={i}>{level}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="col">
          {sourceProducts.toppings && product.has_toppings && (
            <div>
              <h2>Toppings (+${0.75} each)</h2>
              {/* <select className="form-control-lg">
                {toppings.items.map((topping: string) => (
                  <option>{topping}</option>
                ))}
              </select> */}
              <ToppingsGrid
                sourceToppings={sourceProducts.toppings}
                toppings={listToppings}
                setToppings={setListToppings}
              />
            </div>
          )}
        </div>

        <div className="mt-2 custompage-notes-container">
          <h2>Additional Notes</h2>
          <textarea
            className="form-control custompage-textarea"
            id="exampleFormControlTextarea1"
            rows={3}
            value={note}
            onChange={handleNoteChange}
          ></textarea>
        </div>

        <div className="custompage-button-container flex-column flex-sm-row">
          <button className="custompage-button">Save to Favorites</button>
          <button onClick={addProductToCart} className="custompage-button">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
const ToppingsGrid: React.FC<ToppingsGridProps> = ({
  toppings,
  setToppings,
  sourceToppings,
}) => {
  const [checkedToppings, setCheckedToppings] = useState<any>({});

  const handleCheckboxChange = (item: topping) => (event: any) => {
    setCheckedToppings((prevState: topping[]) => ({
      ...prevState,
      [item.name]: event.target.checked,
    }));
    if (event.target.checked) {
      const newListToppings: topping[] = [...toppings];
      newListToppings.push(item);
      setToppings(newListToppings);
    } else {
      const newListToppings: topping[] = [];

      for (let i = 0; i < toppings.length; i++) {
        if (toppings[i] != item) {
          newListToppings.push(toppings[i]);
        }
      }
      setToppings(newListToppings);
    }
  };

  return (
    <div className="py-4">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {sourceToppings.map((item: topping, i: number) =>
          item.quantity ? (
            <div key={i} className="col custompage-topping">
              <input
                className="custompage-checkbox"
                type="checkbox"
                id={`blankCheckbox-${item.name}`}
                checked={!!checkedToppings[item.name]}
                onChange={handleCheckboxChange(item)}
                aria-label={item.name}
              />
              <label htmlFor={`blankCheckbox-${item.name}`} className="ms-3">
                {item.name}
              </label>
            </div>
          ) : (
            <></>
          )
        )}
      </div>
    </div>
  );
};

export default CustomPage;