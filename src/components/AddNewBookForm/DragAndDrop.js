import React, {useRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';

const DragAndDrop = props => {
  const dropRef = useRef(null);
  const dragCounter = useRef(0);
  const [dragging, setDragging] = useState(false);

  const handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = e => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };

  const handleDragOut = e => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;

    if (dragCounter.current > 0) return;
    setDragging(false);
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      props.handleDrop(e.dataTransfer.files);
      e.dataTransfer.clearData();
      dragCounter.current = 0;
    }
  };

  const handleChange = e => {
    props.handleDrop(e.target.files);
  };

  useEffect(() => {
    let div = dropRef.current;
    div.addEventListener('dragenter', handleDragIn);
    div.addEventListener('dragleave', handleDragOut);
    div.addEventListener('dragover', handleDrag);
    div.addEventListener('drop', handleDrop);

    return () => {
      div.removeEventListener('dragenter', handleDragIn);
      div.removeEventListener('dragleave', handleDragOut);
      div.removeEventListener('dragover', handleDrag);
      div.removeEventListener('drop', handleDrop);
    };
  });

  return (
    <div className={'drop-box ' + (dragging ? 'drag-hover' : '')} ref={dropRef}>
      <input className="input" type="file" onChange={handleChange} multiple />
      <div className="drag-text">
        {' '}
        {dragging ? (
          'Drop here'
        ) : (
          <div className="drag-box">
            Click to choose or <br />
            Drop file here
          </div>
        )}
      </div>
    </div>
  );
};

DragAndDrop.propTypes = {
  handleDrop: PropTypes.func
};

export default DragAndDrop;
