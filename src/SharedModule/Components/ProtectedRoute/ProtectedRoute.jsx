import { Navigate, useNavigate } from 'react-router-dom'

function ProtectedRoute({adminData, children}) {

  // const navigate = useNavigate()

  if(adminData == null && localStorage.getItem("adminToken") == null ){
    return(
      <Navigate to="/login"/>
    )
  }else{
   return children
  }


}

export default ProtectedRoute