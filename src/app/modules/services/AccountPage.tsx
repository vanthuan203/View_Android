import React,{useEffect,useState} from 'react'
import {UserList} from './UserList'
import { useDispatch ,useSelector,shallowEqual} from 'react-redux'
import {actions} from './redux/AccountRedux'
import {AccountModel} from 'app/modules/services/models/Account'
import {RootState} from 'setup'
import EditModal  from './modals/EditModal'
import {Input} from "reactstrap";
const AccountPage: React.FC = () => {
  const dispatch = useDispatch()
  const [option, setOption] = useState("view")

  const services: AccountModel[] = useSelector<RootState>(({services}) => services.services, shallowEqual) as AccountModel[] || []
  const currentService: AccountModel = useSelector<RootState>(({services}) => services.currentService, shallowEqual) as AccountModel || undefined
  const [refresh, setRefresh] = useState(true)
  useEffect(() => {
    if(refresh==true){
      dispatch(actions.requestAccounts())
    }
    setRefresh(false)
  },[refresh]);

  return (
    <>

      <div className='row gy-5 gx-xl-12'>
        <div className='col-xl-12' style={{margin:0}}>
          <a style={{float:"right"}} href='#' onClick={() => {
            setRefresh(true)
          }} >
            <img style={{width:32,height:32}} src='/media/dowload/refresh-cw-alt-1-svgrepo-com.svg' className='svg-icon-6' />
          </a>
        </div>
        <div className='col-xl-12' style={{margin:0}}>
          <UserList services={services} className='card-xxl-stretch mb-5 mb-xl-12' />
        </div>
        {
            currentService&&<EditModal key={currentService?.service_id} item={currentService} />
        }
      </div>
    </>
  )
}
export default AccountPage
