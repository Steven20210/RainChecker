import React from 'react'

function Wishlist_item(props) {
    return (
        <li className="wishlist stack-small" id={props.id}>
              <div className="c-cb">
                <label className="wishlist-label" htmlFor={props.id}>
                  {props.name}
                  
                </label>

              </div>
              <label className="wishlist-price" htmlFor={props.prices}>
                  Price:     ${props.prices}
                  
                </label>
              <div className="btn-group">
                <button type="button" className="btn btn__danger" onClick={() => props.deleteTask(props.id)}> 
                Delete <span className="visually-hidden">{props.name}</span> 
                </button>
              </div> 
            </li>
    )
}

export default Wishlist_item
