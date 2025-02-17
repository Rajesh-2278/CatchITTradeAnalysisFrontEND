import React, { useState } from 'react'

export const CompanyDescription = ({description}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
      setIsExpanded(!isExpanded);
    };
  
    return (
      <div>
        <p><strong>Description:</strong> 
          {isExpanded ? (
            description
          ) : (
            `${description?.split(' ').slice(0, 10).join(' ')}...`
          )}
          <span onClick={handleToggle} style={{ color: 'blue', cursor: 'pointer' }}>
            {isExpanded ? ' Read less' : ' Read more'}
          </span>
        </p>
      </div>
    );
}
