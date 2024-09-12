import React,{useEffect,useState} from 'react'
import {ProfileList} from 'app/modules/devices/ProfileList'
import { useDispatch ,useSelector,shallowEqual} from 'react-redux'
import {actions} from 'app/modules/devices/redux/OrdersRedux'
import {ProfileModel} from 'app/modules/devices/models/Order'
import {RootState} from 'setup'
import {Input} from "reactstrap";


type Props = {
    device_id: string
}
const DeviceShow: React.FC<Props> = ({ device_id }) => {
    const dispatch = useDispatch()
    const profiles: ProfileModel[] = useSelector<RootState>(({devices}) => devices.profiles, shallowEqual) as ProfileModel[] || []
    const currentProfile: ProfileModel = useSelector<RootState>(({devices}) => devices.currentProfile, shallowEqual) as ProfileModel || undefined
    const [refresh, setRefresh] = useState(true)
    useEffect(() => {
        if(refresh===true){
            dispatch(actions.requestProfilesByDevice(device_id))
        }
        setRefresh(false)
    },[refresh]);
    return (
        <>
            <div className='row gy-5 gx-xl-12'>
                <div className='col-xl-12' style={{margin:0}}>
                    <ProfileList orders={profiles} className='card-xxl-stretch mb-5 mb-xl-12' />
                </div>
            </div>
        </>
    )
}

export default DeviceShow