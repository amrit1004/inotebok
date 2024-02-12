import React from 'react'

function Alert(props) {
  const capitalize = (word) => {
    if (typeof word === 'string') {
      const lower = word.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    } else {
      return ''; // or handle it according to your use case
    }
  };
  
  return (
    props.alert &&
    <div className={`alert alert-${props.alert.type} alert-dismissible fade show` }role="alert">
   <strong>{capitalize(props.alert.type)}</strong>:{props.alert.msg}
</div>
  )
}

export default Alert