import React from 'react';

import './DetailedRecipe.scss';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EditButtons } from '../EditButtons/EditButtons';
import { setDetailedRecipe } from '../../store/detailedRecipe';
import { disbaleEditMode } from '../../store/edit';
import { useHistory } from 'react-router-dom';

export const DetailedRecipe = () => {
  const detailedRecipe = useSelector(state => state.detailedRecipe);
  const isEdit = useSelector(state => state.isEdit);
  const dispatch = useDispatch();
  const history = useHistory();
  const [reciepToEdit, setReciepToEdit] = useState({})

  let {id} = useParams();
  
  const fetchCurrentRecipe = useCallback(async() => {
    try {
      const repsonse = await fetch(`/api/recipes/recipe/${id}`);
      const answer = await repsonse.json();
      dispatch(setDetailedRecipe(answer));
    } catch (error) {
      console.log(error);
    }
  },[dispatch, id]);

  const saveUpdates = async (updatedRecipe) => {
    try {
      const response = await fetch(`/api/recipes/recipe/${updatedRecipe._id}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(updatedRecipe)
      });
      const info = await response.json();
      dispatch(setDetailedRecipe(updatedRecipe));
      alert(info.message);
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteRecipe = async (_id) => {
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

  useEffect(()=>{
    fetchCurrentRecipe();
  },[fetchCurrentRecipe]);

  useEffect(()=>{
    setReciepToEdit(detailedRecipe)
  }, [detailedRecipe]);

  useEffect(() => {
    return () => {
      dispatch(disbaleEditMode());
    }
  }, [dispatch])

  const cancelEdit = () => {
    setReciepToEdit(detailedRecipe)
    dispatch(disbaleEditMode());
  }

  const handleUpdate = () => {
    saveUpdates(reciepToEdit);
    dispatch(disbaleEditMode());
  }

  const handleChange = (e) => {
    const {value, name} = e.target;

    let newRecipe = {...detailedRecipe}
    
    newRecipe[name] = value;

    setReciepToEdit(newRecipe)
  }

  const handleDelete = () => {
      deleteRecipe(reciepToEdit._id);
      history.push('/');
  }

return (
  <>
  {Object.keys(reciepToEdit).length > 0  && <main className="recipe-detailed container">
    <h2 className="recipe-detailed__title">
        {reciepToEdit.title}
      </h2>
      <img
        src={reciepToEdit.image}
        className="recipe__image recipe-detailed__image--large"
        alt={`${reciepToEdit.title}`} />
      <EditButtons handleCancel={cancelEdit} handleUpdate={handleUpdate} handleDelete={handleDelete} />

      <div className="recipe-detailed__wrapper">
        <div className="recipe-detailed__ingredients-wrapper">
          <h3 className="recipe-detailed__section-title">
            Ingredients
          </h3>
          {isEdit ?
            <textarea
              style={{ width: "90%" }}
              rows="10"
              type="text"
              name="ingredients"
              value={reciepToEdit.ingredients}
              onChange={handleChange}></textarea> :
            <p
              className="recipe-detailed__ingredients">
              {reciepToEdit.ingredients}
            </p>}
        </div>
        <div className="recipe-detailed__preparation-wrapper">
          <h3 className="recipe-detailed__section-title">
            Preparation
          </h3>
          {isEdit ?
            <textarea
              style={{ width: "90%" }}
              rows="10"
              type="text"
              name="directions"
              value={reciepToEdit.directions}
              onChange={handleChange}></textarea> :
            <p
              className="recipe-detailed__preparation">
              {reciepToEdit.directions}
            </p>}
        </div>
        <div className="recipe-detailed__description-wrapper">
        <h3 className="recipe-detailed__section-title">
          Notes
        </h3>
        {isEdit ?
          <textarea
            type="text"
            style={{ width: "90%" }}
            name="directions"
            value={reciepToEdit.description}
            onChange={handleChange}></textarea> :
          <p className="recipe-detailed__description">
            {reciepToEdit.description}
          </p>
        }
      </div>
      </div>
  
    </main>
      }
       </>
  );
};