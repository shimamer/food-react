
import Header from '../../../SharedModule/Components/Header/Header'
import header from '../../../assets/images/eating a variety of foods-amico.svg'
import noData from '../../../assets/images/freepik--Character--inject-70.png'
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form'
import Modal from 'react-bootstrap/Modal';
import { ModalBody } from 'react-bootstrap'
import { useEffect, useState } from 'react';
import NoData from '../../../SharedModule/Components/NoData/NoData'
import axios from 'axios';
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function Recipes() {

  const [recipesList, setRecipesList] = useState()


  const getRecipes = () => {
    axios.get('https://upskilling-egypt.com:443/api/v1/Recipe/',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      })
      .then((response) => {
        setRecipesList(response.data.data)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getRecipes()
  }, [])

  const [showState, setShowState] = useState('close');
  const [itemID, setItemID] = useState();

  const handleClose = () => {
    setShowState('close');
  }

  const handleShowAdd = () => {
    setShowState('add-state');
  }

  const handleShowDelete = (id) => {
    setShowState('delete-state');
    setItemID(id)
  }
  const handleShowUpdate = (RecipeItem) => {
    setShowState('update-state');
    setItemID(RecipeItem.id);
    // setValue("name", RecipeItem.name)
  }

  return (
    <>
      <Header>
        <div className="header p-4">
          <div className="row align-items-center text-white">
            <div className="col-md-10">
              <h3>recipes items!</h3>
              <p>You can now add your items that any user can order it from the Application and you can edit</p>

            </div>
            <div className="col-md-2">
              <img className='w-100' src={header} alt="" />
            </div>
          </div>
        </div>
      </Header>

      <Modal show={showState == 'add-state'} onHide={handleClose}>
        <ModalBody>
          <h3>Add Recipe</h3>

          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className='form-group'>
              <input type="text"
                className='form-control my-2'
                placeholder='Category Name'
                {...register("name",
                  {
                    required: true
                  })} />
              {errors.name && errors.name.type === "required" && <span className='text-danger'>Feild is required</span>}
            </div>
            <div className='form-group'>
              <button className='btn btn-success w-100'>Save</button>
            </div>
          </form>

        </ModalBody>


      </Modal>

      <Modal show={showState == 'delete-state'} onHide={handleClose}>
        <ModalBody>
          <div>delete</div>
          {/* <div className='text-center'>
            <img src={noData} alt="" />
            <h4 className='mt-2'>Delete This Category ?</h4>
            <p className='text-muted p-2'>are you sure you want to delete this item? if you are sure just click on delete it</p>
            <hr className='text-muted w-75 m-auto' />
            <div className='d-flex justify-content-end mt-3'>
              <button className='btn btn-outline-danger' onClick={deleteCategory}>Delete this item</button>
            </div>
          </div> */}
        </ModalBody>
      </Modal>

      <Modal show={showState == 'update-state'} onHide={handleClose}>
        <ModalBody>
          <h3>Update Recipe</h3>
          {/* <form action="" onSubmit={handleSubmit(updateCategory)}>
            <div className='form-group'>
              <input type="text"
                className='form-control my-2'
                placeholder='Category Name'
                {...register("name",
                  {
                    required: true
                  })} />
              {errors.name && errors.name.type === "required" && <span className='text-danger'>Feild is required</span>}
            </div>
            <div className='form-group'>
              <button className='btn btn-success w-100'>Update</button>
            </div>
          </form> */}
        </ModalBody>


      </Modal>

      <div className=" p-4">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h5>Recipes Table Details</h5>
            <span className='text-muted'>You can check all details</span>
          </div>
          <div className="col-md-6 text-end">
            <button onClick={handleShowAdd} className='btn btn-success me-1'>
              Add new Recipe
            </button>
          </div>
        </div>
      </div>

      {
        recipesList?.length > 0 ?
          <div className="p-4">
            <table className="table p-4">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Recipe name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Price</th>
                  <th scope="col">Discription</th>
                  <th scope="col">Category</th>
                  <th scope="col">Tag</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>

                {
                  recipesList?.map((Recipe, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{Recipe.id}</th>
                        <td>{Recipe.name}</td>
                        <td scope="col">Image</td>
                        <td scope="col">Price</td>
                        <td scope="col">Discription</td>
                        <td scope="col">Category</td>
                        <td scope="col">Tag</td>
                        <td>
                          <MdEditSquare onClick={() => handleShowUpdate(Recipe)} className='text-warning me-2' />
                          <MdDelete onClick={() => handleShowDelete(Recipe.id)} className='text-danger' />
                        </td>
                      </tr>
                    )
                  })
                }

              </tbody>
            </table>
          </div>
          : <NoData />
      }

    </>
  )
}

export default Recipes