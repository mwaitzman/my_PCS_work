import React from 'react'

export default function ListComponent(props) {
  const { name, items } = props;
  const lineItems = items.map(i => <li key={i}>{i}</li>);

  return (
    <>
      <h4>{name}</h4>
      <ul className="bulletless">
        {lineItems}
      </ul>
    </>
  )
}
