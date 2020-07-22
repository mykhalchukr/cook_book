import React from "react";
import cn from "classnames";

import { setEditMode } from "../../store/edit";
import { useDispatch, useSelector } from "react-redux";

export const EditButtons = ({
  handleCancel,
  handleUpdate,
  handleDelete,
  handleFork,
}) => {
  const dispatch = useDispatch();
  const isEdit = useSelector((state) => state.isEdit);

  return (
    <div className="recipe-detailed__btn-wrapper">
      <button
        className={cn("button", "recipe-detailed__button", {
          "recipe-detailed__button--hidden": isEdit,
        })}
        onClick={() => {
          dispatch(setEditMode());
        }}
      >
        Edit Recipe
      </button>
      <button
        className={cn("button", "recipe-detailed__button", {
          "recipe-detailed__button--hidden": !isEdit,
        })}
        onClick={handleUpdate}
      >
        Update
      </button>
      <button
        className={cn("button", "recipe-detailed__button", {
          "recipe-detailed__button--hidden": !isEdit,
        })}
        onClick={handleCancel}
      >
        Cancel
      </button>
      <button
        className={cn("button", "recipe-detailed__button", {
          "recipe-detailed__button--hidden": !isEdit,
        })}
        onClick={handleFork}
      >
        Fork
      </button>
      <button
        className={cn(
          "button",
          "recipe-detailed__button",
          "recipe-detailed__button--delete",
          {
            "recipe-detailed__button--hidden": !isEdit,
          }
        )}
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};
