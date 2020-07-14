import React from 'react';
import cn from 'classnames';

import { setEditMode } from '../../store/edit';
import { disbaleEditMode } from '../../store/edit';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export const EditButtons = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const isEdit = useSelector(state => state.isEdit);
  const detailedRecipe = useSelector(state => state.detailedRecipe);

  const {
    _id,
    ingredients,
    description,
    directions,
  } = detailedRecipe;

  const saveUpdates = async (updatedRecipe) => {
    try {
      const response = await fetch(`/api/recipes/recipe/${_id}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(updatedRecipe)
      });
      const info = await response.json();
      alert(info.message);
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteRecipe = async () => {
    try {
      const response = await fetch(`/api/recipes/recipe/${_id}`, {
        method: "DELETE",
      });
      const info = await response.json();
      alert(info.message);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="recipe-detailed__btn-wrapper">
      <button
        className={
          cn('button', 'recipe-detailed__button', {
            'recipe-detailed__button--hidden': isEdit
          })
        }
        onClick={
          () => {
            dispatch(setEditMode());
          }
        }
      >
        Edit Recipe
      </button>
      <button
        className={cn('button', 'recipe-detailed__button', {
          'recipe-detailed__button--hidden': !isEdit
        })}
        onClick={(e) => {
          e.preventDefault();
          const updatedRecipe = {
            ingredients,
            description,
            directions,
          };
          saveUpdates(updatedRecipe);
          dispatch(disbaleEditMode());
        }}
      >
        Update
      </button>
      <button
        className={cn('button', 'recipe-detailed__button', {
          'recipe-detailed__button--hidden': !isEdit
        })}
        onClick={
          () => {
            dispatch(disbaleEditMode());
          }
        }>
        Cancel
      </button>
      <button

        className={cn('button', 'recipe-detailed__button', 'recipe-detailed__button--delete',{
          'recipe-detailed__button--hidden': !isEdit
        } )}
        onClick={() => {
          deleteRecipe();
          history.push('/');
        }}
      >
        Delete
      </button>
    </div>
  );
}; 