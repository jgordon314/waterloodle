import { useCombobox } from "downshift";
import React from "react";
import "./SearchBar.css";

export function SearchBar({ handleSubmit, handleGiveUp, buildings }) {
  const [items, setItems] = React.useState([]);
  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useCombobox({
    onInputValueChange({ inputValue }) {
      const normalizedInput = (inputValue ?? "").trim().toLowerCase();

      if (!normalizedInput) {
        setItems([]);
        return;
      }

      setItems(
        buildings.filter(
          (x) =>
            x.acronym.toLowerCase().includes(normalizedInput) ||
            x.name.toLowerCase().includes(normalizedInput),
        ),
      );
    },
    items,
    itemToString(item) {
      return item ? item.name : "";
    },
  });

  return (
    <form
      className="search-bar"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(selectedItem);
      }}
      autoComplete="off"
    >
      <input
        className="search-bar__autofill-trap"
        type="text"
        name="fake-contact-field"
        autoComplete="username"
        tabIndex={-1}
        aria-hidden="true"
      />
      <div className="search-bar__controls">
        <div className="search-bar__combobox">
          <input
            type="search"
            placeholder="Enter building name..."
            className="search-bar__input"
            {...getInputProps({
              autoComplete: "off",
              autoCorrect: "off",
              autoCapitalize: "none",
              spellCheck: false,
              name: "campus-building-search",
              enterKeyHint: "search",
            })}
          />
          <button
            aria-label="toggle menu"
            className="search-bar__toggle"
            type="button"
            {...getToggleButtonProps()}
          >
            {isOpen ? <>&#8593;</> : <>&#8595;</>}
          </button>

          <ul
            className={`search-bar__menu ${!(isOpen && items.length) ? "search-bar__menu--hidden" : ""}`}
            {...getMenuProps()}
          >
            {isOpen &&
              items.map((item, index) => (
                <li
                  className={`search-bar__item ${highlightedIndex === index ? "search-bar__item--highlighted" : ""} ${selectedItem === item ? "search-bar__item--selected" : ""}`}
                  key={item.objectId}
                  {...getItemProps({ item, index })}
                >
                  <span className="search-bar__item-name">{item.name}</span>
                  <span className="search-bar__item-meta">{item.acronym}</span>
                </li>
              ))}
          </ul>
        </div>
        <button type="submit" className="search-bar__action">
          Submit
        </button>
        <button
          className="search-bar__action"
          onClick={handleGiveUp}
          type="button"
        >
          Give Up
        </button>
      </div>
    </form>
  );
}
