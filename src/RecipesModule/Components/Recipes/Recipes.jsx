
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
  const [pageArray, setPageArray] = useState()
  const [searchString, setSearchString] = useState()
  const [searchTag, setSearchTag] = useState()
  const [searchCategory, setSearchCategory] = useState()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm()

  const getRecipes = (pageNo, name, tagId, categoryId) => {
    axios.get('https://upskilling-egypt.com:3006/api/v1/Recipe/',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        },
        params:
        {
          pageSize: 5,
          pageNumber: pageNo,
          name: name,
          tagId: tagId,
          categoryId: categoryId
        }
      })
      .then((response) => {

        setPageArray(Array(response.data.totalNumberOfPages).fill().map((_, i) => i + 1))
        setRecipesList(response.data.data)
      })
      .catch((error) => console.log(error))
  }

  const [tagsList, setTagsList] = useState([])
  const getTags = () => {
    axios.get('https://upskilling-egypt.com:3006/api/v1/tag/',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      })
      .then((response) => {
        setTagsList(response.data)
      })
      .catch((error) => console.log(error))
  }

  const [categoriesList, setCategoriesList] = useState()
  const getCategories = () => {
    axios.get('https://upskilling-egypt.com:3006/api/v1/Category/',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      })
      .then((response) => {
        setCategoriesList(response.data.data)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getRecipes(1)
    getTags()
    getCategories()
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
    setValue("name", RecipeItem.name)
    setValue("description", RecipeItem.description)
    setValue("price", RecipeItem.price)
    setValue("recipeImage", RecipeItem.imagePath)
    setValue("tagId", RecipeItem.tag.id)
    setValue("categoriesIds", RecipeItem.category[0].name)
  }

  const deleteRecipe = () => {
    axios.delete(`https://upskilling-egypt.com:3006/api/v1/Recipe/${itemID}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`
      }
    }).then((response) => {
      console.log(response);
      handleClose();
      getRecipes()
      toast.success(`Recipe deleted successfully`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }).catch((error) => {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
    )
  }

  const onSubmit = (data) => {
    console.log(data);

    const addFormData = new FormData();
    addFormData.append("name", data['name'])
    addFormData.append("description", data['description'])
    addFormData.append("price", data['price'])
    addFormData.append("recipeImage", data['recipeImage'][0])
    addFormData.append("tagId", data['tagId'])
    addFormData.append("categoriesIds", data['categoriesIds'])
    console.log(addFormData);
    axios.post('https://upskilling-egypt.com:3006/api/v1/Recipe/', addFormData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`
      }
    }).then((res) => {
      console.log(res);
      handleClose()
      getRecipes()

      toast.success(`Recipe added successfully`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })

      setValue('name')
      setValue('description')
      setValue('tagId')
      setValue('price')
      setValue('categoriesIds')
      setValue('recipeImage')
    })
      .catch((error) => {
        console.log(error)
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      })
  }

  const updateRecipe = (data) => {
    axios.put(`https://upskilling-egypt.com:3006/api/v1/Recipe/${itemID}`, data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      }).then((response) => {
        console.log(response);
        handleClose();
        getRecipes()
        toast.success(`Recipe Updated successfully`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }).catch((error) => {
        console.log(error);
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      })
  }

  const getNameValue = (e) => {
    getRecipes(1, e.target.value, searchTag, searchCategory);
    setSearchString(e.target.value)
  }

  const getTagValue = (e) => {
    setSearchTag(e.target.value)
    getRecipes(1, searchString , e.target.value, searchCategory);
  }

  const getcategoryValue = (e) => {
    setSearchCategory(e.target.value)
    getRecipes(1,searchString, searchTag, e.target.value);
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
                placeholder='Recipe Name'
                {...register("name",
                  {
                    required: true
                  })} />
              {errors.name && errors.name.type === "required" && <span className='text-danger'>Feild is required</span>}
            </div>

            <div className='form-group'>
              <textarea type="text"
                className='form-control my-2'
                placeholder='Description'
                {...register("description",
                  {
                    required: true
                  })} ></textarea>
              {errors.description && errors.description.type === "required" && <span className='text-danger'>Feild is required</span>}
            </div>

            <div className='form-group'>
              <input type="number"
                className='form-control my-2'
                placeholder='price'
                {...register("price",
                  {
                    required: true,
                    valueAsNumber: true
                  })} />
              {errors.price && errors.price.type === "required" && <span className='text-danger'>Feild is required</span>}
            </div>

            <div className='form-group'>
              <select
                className=' my-2 form-select'
                {...register("tagId",
                  {
                    required: true,
                    valueAsNumber: true
                  })} >
                <option value="" selected disabled> select tag</option>
                {tagsList &&
                  tagsList?.map((tag, index) => {
                    return (
                      <option key={index} value={tag.id}>{tag.name}</option>
                    )
                    // console.log(tag.id);
                  })
                }
              </select>
              {errors.tagId && errors.tagId.type === "required" && <span className='text-danger'>Feild is required</span>}
            </div>

            <div className='form-group'>
              <select
                className=' my-2 form-select'
                {...register("categoriesIds",
                  {
                    required: true
                  })} >

                <option value="" selected disabled> select category</option>

                {
                  categoriesList?.map((category, index) => {
                    return (
                      <option key={index} value={category.name}>{category.name}</option>
                    )
                    // console.log(category.id);
                  })
                }

              </select>
              {errors.categoriesIds && errors.categoriesIds.type === "required" && <span className='text-danger'>Feild is required</span>}
            </div>

            <div className='form-group'>
              <input type="file"
                className='form-control my-2'
                {...register("recipeImage")} />
            </div>

            <div className='form-group'>
              <button className='btn btn-success w-100 my-2'>Save</button>
            </div>

          </form>

        </ModalBody>


      </Modal>

      <Modal show={showState == 'delete-state'} onHide={handleClose}>
        <ModalBody>
          <div className='text-center'>
            <img src={noData} alt="" />
            <h4 className='mt-2'>Delete This Recipe ?</h4>
            <p className='text-muted p-2'>are you sure you want to delete this item? if you are sure just click on delete it</p>
            <hr className='text-muted w-75 m-auto' />
            <div className='d-flex justify-content-end mt-3'>
              <button className='btn btn-outline-danger' onClick={deleteRecipe}>Delete this item</button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      <Modal show={showState == 'update-state'} onHide={handleClose}>
        <ModalBody>
          <h3>Update Recipe</h3>

          <form action="" onSubmit={handleSubmit(updateRecipe)}>

            <div className='form-group'>
              <input type="text"
                className='form-control my-2'
                placeholder='Recipe Name'
                {...register("name",
                  {
                    required: true
                  })} />
              {errors.name && errors.name.type === "required" && <span className='text-danger'>Feild is required</span>}
            </div>

            <div className='form-group'>
              <textarea type="text"
                className='form-control my-2'
                placeholder='Description'
                {...register("description",
                  {
                    required: true
                  })} ></textarea>
              {errors.description && errors.description.type === "required" && <span className='text-danger'>Feild is required</span>}
            </div>

            <div className='form-group'>
              <input type="number"
                className='form-control my-2'
                placeholder='price'
                {...register("price",
                  {
                    required: true,
                    valueAsNumber: true
                  })} />
              {errors.price && errors.price.type === "required" && <span className='text-danger'>Feild is required</span>}
            </div>

            <div className='form-group'>
              <select
                className=' my-2 form-select'
                {...register("tagId",
                  {
                    required: true,
                    valueAsNumber: true
                  })} >
                <option value="" selected disabled> select tag</option>
                {
                  tagsList?.map((tag, index) => {
                    return (
                      <option key={index} value={tag.id}>{tag.name}</option>
                    )
                    // console.log(tag.id);
                  })
                }
              </select>
              {errors.tagId && errors.tagId.type === "required" && <span className='text-danger'>Feild is required</span>}
            </div>

            <div className='form-group'>
              <select
                className=' my-2 form-select'
                {...register("categoriesIds",
                  {
                    required: true
                                      })} >

                <option value="" selected disabled> select category</option>

                {
                  categoriesList?.map((category, index) => {
                    return (
                      <option key={index} value={category.id}>{category.name}</option>
                    )
                    // console.log(category.id);
                  })
                }

              </select>
              {errors.categoriesIds && errors.categoriesIds.type === "required" && <span className='text-danger'>Feild is required</span>}
            </div>

            <div className='form-group'>
              <input type="file"
                className='form-control my-2'
                {...register("recipeImage")} />
              {/* {
                Recipe.imagePath ? <img className='width-img'
                  src={`https://upskilling-egypt.com/` + Recipe?.imagePath}
                  alt="" /> : <img className='width-img'
                    src={noData}
                    alt="" />
              } */}
            </div>

            <div className='form-group'>
              <button className='btn btn-success w-100 my-2'>Save</button>
            </div>

          </form>
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

      <div className="row my-2 searching">
        <div className="col-md-4 ">
          <input type="text" placeholder='Search by Recipe name...' className='form-control'
            onChange={getNameValue} />
        </div>

        <div className="col-md-4">
          <select className='form-select' onChange={getTagValue} >
            <option value="" selected disabled>select tag</option>
            {
              tagsList?.map((tag, index) => {
                return (
                  <option key={index} value={tag.id}>{tag.name}</option>
                )
              })
            }
          </select>
        </div>

        <div className="col-md-4">
          <select className='form-select' onChange={getcategoryValue}>
            <option value="" selected disabled> select category</option>
            {
              categoriesList?.map((category, index) => {
                return (
                  <option key={index} value={category.id}>{category.name}</option>
                )
              })
            }
          </select>
        </div>
      </div>

      {
        recipesList?.length > 0 ?
          <div className="p-4">

           <div className='table-responsive'>
           <table className="table table-striped p-4">
              <thead className='table-light'>
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
                        <th scope="row">{index + 1}</th>
                        <td>{Recipe.name}</td>
                        <td scope="col">
                          {
                            Recipe.imagePath ? <img className='width-img'
                              src={`https://upskilling-egypt.com:3006/` + Recipe?.imagePath}
                              alt="" /> : <img className='width-img'
                                src={noData}
                                alt="" />
                          }                        </td>
                        <td scope="col">{Recipe.price}</td>
                        <td scope="col">{Recipe.description}</td>
                        <td scope="col">{Recipe.category[0]?.name}</td>
                        <td scope="col">{Recipe.tag.name}</td>
                        <td>
                          <MdEditSquare onClick={() => handleShowUpdate(Recipe)} className='text-warning me-2' />
                          <MdDelete onClick={() => handleShowDelete(Recipe.id)} className='text-danger' />
                        </td>
                      </tr>
                    )
                    // console.log(Recipe);
                  })
                }

              </tbody>

            </table>
           </div>

            <nav aria-label="..." className='d-flex justify-content-end'>
              <ul className="pagination pagination-sm">
                {
                  pageArray.map((pageNo, index) => {
                    return (
                      <li key={index} onClick={() => getRecipes(pageNo, searchString, searchTag, searchCategory)} className="page-item disabled px-0 cursor-pointer">
                        <a className="page-link">{pageNo}</a>
                      </li>
                    )
                    {/* <li className="page-item px-0"><a className="page-link" href="#">2</a></li> */ }

                  })
                }
              </ul>
            </nav>

          </div>
          : <NoData />
      }

    </>
  )
}

export default Recipes