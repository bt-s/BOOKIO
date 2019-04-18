import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';

const Autocomplete = props => {
  const {
    getUserPick,
    fetchSuggestions,
    suggestions,
    isLoading,
    suggestionsImage,
    suggestionsAuthor,
    placeholder,
    getUserInput
  } = props;
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState('');

  let wrapper = null;
  const wrapperRef = useCallback(node => {
    if (node !== null) {
      wrapper = node;
    }
  }, []);

  const onChange = e => {
    const userInputVal = e.currentTarget.value;
    if (fetchSuggestions) {
      fetchSuggestions(userInputVal);
    }

    setActiveSuggestion(0);
    setShowSuggestions(true);
    setUserInput(userInputVal);

    if (getUserInput) getUserInput(userInputVal);
  };

  const onClick = e => {
    const regex = /by .*/gi;
    setActiveSuggestion(0);
    setShowSuggestions(false);
    setUserInput(e.currentTarget.innerText.replace(regex, ''));

    if (getUserPick) getUserPick(activeSuggestion);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = e => {
    if (wrapper && !wrapper.contains(e.target)) {
      setShowSuggestions(false);
    }
  };

  const onMouseEnter = index => {
    setActiveSuggestion(index);
  };

  const onKeyDown = e => {
    // User pressed the enter key
    if (e.keyCode === 13) {
      setUserInput(suggestions[activeSuggestion]);
      setActiveSuggestion(0);
      setShowSuggestions(false);
      if (getUserPick) getUserPick(activeSuggestion);
    }

    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    }

    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === suggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    } else if (e.keyCode === 27) {
      setShowSuggestions(false);
    }
  };

  const suggestionsListComponent =
    showSuggestions &&
    userInput &&
    (!isLoading ? (
      <ul className="suggestions" ref={wrapperRef}>
        {suggestions.map((suggestion, index) => {
          let className;

          // Flag the active suggestion with a class
          if (index === activeSuggestion) {
            className = 'suggestion-active';
          }

          return (
            <li
              className={className}
              key={index}
              onClick={onClick}
              onMouseEnter={() => onMouseEnter(index)}>
              {suggestionsImage && (
                <img
                  alt=".."
                  className="image-suggestion"
                  src={suggestionsImage[index]}
                />
              )}
              <div className="desc-wrapper">
                <div>{suggestion}</div>
                {suggestionsAuthor && (
                  <span>{'by ' + suggestionsAuthor[index]}</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    ) : (
      <div className="suggestions loading">
        <span>Loading...</span>
      </div>
    ));

  return (
    <React.Fragment>
      <input
        className={props.className}
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput}
        placeholder={placeholder}
      />
      {suggestionsListComponent}
    </React.Fragment>
  );
};

Autocomplete.propTypes = {
  className: PropTypes.string,
  suggestions: PropTypes.array,
  isLoading: PropTypes.bool,
  fetchSuggestions: PropTypes.func,
  getUserPick: PropTypes.func,
  placeholder: PropTypes.string,
  getUserInput: PropTypes.func
};

export default Autocomplete;
