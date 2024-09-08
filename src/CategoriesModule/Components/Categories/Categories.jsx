import React, { useState } from 'react'
import header from '../../../assets/images/eating a variety of foods-amico.svg'
import Header from '../../../SharedModule/Components/Header/Header'
import { useEffect } from 'react'
import axios from 'axios'
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import NoData from '../../../SharedModule/Components/NoData/NoData'
import Modal from 'react-bootstrap/Modal';
import { ModalBody } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import noData from '../../../assets/images/freepik--Character--inject-70.png'
import { toast } from 'react-toastify';

function Categories() {

  const [categoriesList, setCategoriesList] = useState()
  const [pageArray, setPageArray] = useState()

  const getCategories = (pageNo, name) => {
    axios.get('https://upskilling-egypt.com:3006/api/v1/Category/',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        },
        params:{
          pageSize: 5,
          pageNumber: pageNo,
          name: name
        }
      })
      .then((response) => {
        setPageArray(Array(response.data.totalNumberOfPages).fill().map((_, i) => i + 1))
        setCategoriesList(response.data.data)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getCategories(1)
  }, [])

  const [showState, setShowState] = useState('close');
  const [itemID, setItemID] = useState();
  const [searchString, setSearchString] = useState();

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
  const handleShowUpdate = (categoryItem) => {
    setShowState('update-state');
    setItemID(categoryItem.id);
    setValue("name", categoryItem.name)
  }

  const deleteCategory = () => {
    axios.delete(`https://upskilling-egypt.com:3006/api/v1/Category/${itemID}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`
      }
    }).then((response) => {
      console.log(response);
      handleClose();
      getCategories()
      toast.success(`Category deleted successfully`, {
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm()

  const onSubmit = (data) => {
    console.log(data);
    axios.post('https://upskilling-egypt.com:3006/api/v1/Category/', data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`
      }
    }).then((res) => {
      console.log(res);
      handleClose()
      getCategories()
      setValue('name')
      toast.success(`Category added successfully`, {
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

  const updateCategory = (data) => {
    axios.put(`https://upskilling-egypt.com:3006/api/v1/Category/${itemID}`, data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`
      }
    }).then((response) => {
      console.log(response);
      handleClose();
      getCategories()
      toast.success(`Category Updated successfully`, {
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
    setSearchString(e.target.value)
    getCategories(1,e.target.value);
  }
  return (
    <>

      <Header>
        <div className="header p-4">
          <div className="row align-items-center text-white">
            <div className="col-md-10">
              <h3>Categories Item</h3>
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
          <h3>Add Category</h3>
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
          <div className='text-center'>
            <img src={noData} alt="" />
            <h4 className='mt-2'>Delete This Category ?</h4>
            <p className='text-muted p-2'>are you sure you want to delete this item? if you are sure just click on delete it</p>
            <hr className='text-muted w-75 m-auto' />
            <div className='d-flex justify-content-end mt-3'>
              <button className='btn btn-outline-danger' onClick={deleteCategory}>Delete this item</button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      <Modal show={showState == 'update-state'} onHide={handleClose}>
        <ModalBody>
        <h3>Update Category</h3>
          <form action="" onSubmit={handleSubmit(updateCategory)}>
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
          </form>
        </ModalBody>


      </Modal>

      <div className=" p-4">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h5>Categories Table Details</h5>
            <span className='text-muted'>You can check all details</span>
          </div>
          <div className="col-md-6 text-end">
            <button onClick={handleShowAdd} className='btn btn-success me-1'>
              Add new category
            </button>
          </div>
        </div>
      </div>

      <input type="text" placeholder='Search by category name...' className='form-control'
      onChange={getNameValue} />

      { 
        categoriesList?.length > 0 ?
          <div className="p-4">
          <table className="table table-striped p-4">
            <thead className='table-light'>
              <tr>
                <th scope="col">#</th>
                <th scope="col">name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>

              {
                categoriesList?.map((category, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{category.name}</td>
                      <td>
                        <MdEditSquare onClick={() => handleShowUpdate(category)} className='text-warning me-2' />
                        <MdDelete onClick={() => handleShowDelete(category.id)} className='text-danger' />
                      </td>
                    </tr>
                  )
                })
              }

            </tbody>
          </table>

          <nav aria-label="..." className='d-flex justify-content-end'>
              <ul className="pagination pagination-sm">
                {
                  pageArray.map((pageNo, index) => {
                    return (
                      <li key={index} onClick={()=>getCategories(pageNo,searchString)} className="page-item disabled px-0 cursor-pointer">
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

export default Categories