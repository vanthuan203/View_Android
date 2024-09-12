import React, { useState, useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import { AccountModel } from 'app/modules/users/models/Account'
import { useDispatch } from 'react-redux'
import { actions } from '../../redux/AccountRedux'
import 'bootstrap/dist/css/bootstrap.min.css';
import { RootState } from 'setup'
import { useSelector, shallowEqual } from 'react-redux'
import {
    Button, Modal, ModalFooter,
    ModalHeader, ModalBody, Input
} from "reactstrap"


type Props = {
    show: boolean
    close: () => void
}
function format1(n:number) {
    return n.toFixed(0).replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
}
const AddManualModal: React.FC<Props> = ({show,close }) => {
    const dispatch = useDispatch()
    const API_URL = process.env.REACT_APP_API_URL
    const adding: boolean = useSelector<RootState>(({ users }) => users.adding, shallowEqual) as boolean || false
    let [username, setusername] = useState("")
    let [password, setpassword] = useState("")
    let [balance, setbalance] = useState(0)
    const [discount, setdiscount] = useState(0)
    const [max_order, setmaxorder] = useState(1000)
    const [note, setnote] = useState("")
    const [rate, setrate] = useState(100)
    const [role, setrole] = useState("ROLE_USER")
    const [vip, setvip] = useState(0)
    const [add, setadd] = useState(1)
    const dismissModal = () => {
        close()
    }
    const addUser = () => {
        if(rate<0){
            alert("% Rate không hợp lệ!")
            return
        }
        if(discount>100 || discount<0){
            alert("% Discount không hợp lệ!")
            return
        }
        if(max_order<0){
            alert("Giá trị Max Orders không hợp lệ!")
            return
        }
        console.log(add)
        if(add==0){
           balance=-balance
        }
        console.log(balance)
        dispatch(actions.addAccountRequest({
            password,
           username,
            balance,
            discount,
            max_order,
            vip,
            note,
            role,
            rate,
        }))
    }
    useEffect(() => {
        if (!adding) {
            close()
        }
    }, [adding])
    return (
        <Modal isOpen={show}
            modalTransition={{ timeout: 500 }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h3 style={{fontWeight:'bold',fontFamily:'monospace'}}  className="modal-title">Add User</h3>
                    <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" aria-label="Close">
                        <span className="svg-icon svg-icon-2x"></span>
                    </div>
                </div>
                <div className="modal-body">
                    <div className="input-group mb-5">
                        <span className="input-group-text" id="basic-addon2">Username</span>
                        <input style={{fontWeight:'bold'}} value={username} type="text" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setusername(e.target.value)}
                        />
                    </div>
                    <div className="input-group mb-5">
                        <span className="input-group-text" id="basic-addon2">Password</span>
                        <input style={{fontWeight:'bold'}} value={password} type="text" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setpassword(e.target.value)}
                        />
                    </div>
                    <div className="input-group mb-5">
                        <span className="input-group-text" id="basic-addon2">Balance($)</span>
                        <input style={{fontWeight:'bold'}} value={balance} type="number" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setbalance(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="input-group mb-5">
                        <span className="input-group-text" id="basic-addon2">Rate(%)</span>
                        <input style={{fontWeight:'bold'}} value={rate} type="number" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setrate(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="input-group mb-5">
                        <span className="input-group-text" id="basic-addon2">Discount(%)</span>
                        <input style={{fontWeight:'bold'}} value={discount} type="number" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setdiscount(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="input-group mb-5">
                        <span className="input-group-text" id="basic-addon2">Max Orders</span>
                        <input style={{fontWeight:'bold'}} value={max_order} type="number" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setmaxorder(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="input-group mb-5">
                        <span className="input-group-text" id="basic-addon2">Vip</span>
                        <Input
                            onChange={(e) => setvip(parseInt(e.target.value))}
                            className="form-control form-control-solid"
                            type="select"
                            style={{fontWeight:'bold'}}
                            value={vip}
                        >
                            <option key={1} value={1}>
                                {"True"}
                            </option>
                            <option key={0} value={0}>
                                {"False"}
                            </option>

                        </Input>
                    </div>
                    <div className="input-group mb-5">
                        <span className="input-group-text" id="basic-addon2">Role</span>
                        <Input
                            onChange={(e) => setrole(e.target.value)}
                            className="form-control form-control-solid"
                            type="select"
                            style={{fontWeight:'bold'}}
                            value={role}
                        >
                            <option key={"ROLE_USER"} value={"ROLE_USER"}>
                                {"ROLE_USER"}
                            </option>
                            <option key={"ROLE_ADMIN"} value={"ROLE_ADMIN"}>
                                {"ROLE_ADMIN"}
                            </option>
                            <option key={"ROLE_STAFF"} value={"ROLE_STAFF"}>
                                {"ROLE_STAFF"}
                            </option>
                            <option key={"ROLE_SUPPORT"} value={"ROLE_SUPPORT"}>
                                {"ROLE_SUPPORT"}
                            </option>

                        </Input>
                    </div>
                    <div className="input-group mb-5">
                        <span className="input-group-text" id="basic-addon2">Note</span>
                        <input style={{fontWeight:'bold'}} value={note} type="text" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setnote(e.target.value)}
                        />
                    </div>

                </div>
                <div className="modal-footer">
                    <button type="button" onClick={dismissModal} className="btn btn-light" >Thoát</button>
                    <button disabled={adding} type="button" onClick={addUser} style={{backgroundColor:"#26695c",color:"white"}} className="btn ">Lưu</button>
                </div>
            </div>

        </Modal>
    )
}

export default AddManualModal