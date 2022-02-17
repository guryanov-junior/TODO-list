import React from 'react';
import './TagsList.scss';

const TagsList = (props) => {
  const { tags, removeTags } = props;

  return (
    <div className='tags-list'>
      {[...new Set(tags)].map((tag, index) => (
        <span key={index} onClick={() => removeTags(tag)}>
          {tag}
        </span>
      ))}
    </div>
  );
};

export { TagsList };
