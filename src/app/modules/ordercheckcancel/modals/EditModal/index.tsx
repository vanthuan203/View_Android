import React, { useState, useEffect } from 'react'
import { OrderModel } from 'app/modules/ordercheckcancel/models/Order'
import { actions } from '../../redux/OrdersRedux'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button, Modal,
    Form, FormGroup, Input, Label, ModalFooter,
    ModalHeader, ModalBody
} from "reactstrap"
import {useDispatch, useSelector, shallowEqual } from 'react-redux'
import { RootState } from 'setup'
import { Group } from '../../models/Order'
import {updateOrder} from "../../redux/OrdersCRUD";
import {toAbsoluteUrl} from "../../../../../_metronic/helpers";


type Props = {
    item: OrderModel

}

const EditModal: React.FC<Props> = ({ item}) => {
    function format1(n:number) {
        return n.toFixed(0).replace(/./g, function(c, i, a) {
            return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
        });
    }
    
    const role: string = useSelector<RootState>(({ auth }) => auth.user?.role, shallowEqual) as string || ""
    const discount: number = useSelector<RootState>(({ auth }) => auth.user?.discount, shallowEqual) as number || 0
    const username: string = useSelector<RootState>(({ auth }) => auth.user?.username, shallowEqual) as string || ""
    const adding: boolean = useSelector<RootState>(({ ordercheckcancel }) => ordercheckcancel.adding, shallowEqual) as boolean || false
    //const groups: Group[] = useSelector<RootState>(({ orders }) => orders.groups, shallowEqual) as Group[] || []
    //const orders: OrderModel[] = useSelector<RootState>(({ orders }) => orders.orders, shallowEqual) as OrderModel[] || []


    const dispatch = useDispatch()
    const [maxthreads, setMaxthreads] = useState(item.maxthreads)
    //const [videoid, setVideoid] = useState("")
    //const [list_video, setList_video] = useState("")
    //
    const [view_need, setView_need] = useState(1000)
    const [premium_rate,setPremium_rate]=useState(5)
    const [view_percent,setView_percent]=useState(4000)

    const [note, setNote] = useState(item.note)
    const [viewstart, setViewstart] = useState(0)
    const [vieworder, setvieworder] = useState(item.vieworder)
    const [user,setUser]=useState(username)
    const dismissModal = () => {
        dispatch(actions.clearcurrentOrder())
    }
    let [timebuff_old,setTimebuff_Old]=useState(0);
    const submit = () => {

        if (vieworder<parseInt((item.viewtotal).toFixed(0))+100) {
            alert("Số giờ thay đổi phải lớn hơn tổng giờ đã chạy ít nhất 100h! (>="+(item.vieworder+100).toFixed(0)+"view)")
            return
        }
        dispatch(actions.requestUpdate({
            ...item,
            note,
            maxthreads,
            vieworder,
            user
        }))
     
    }

    return (
        <Modal isOpen={true}
            modalTransition={{ timeout: 500 }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Update {item.videoid} | Đã chạy {format1((item.viewtotal==null?0:item.viewtotal))}</h5>
                </div>
                <div className="modal-body">
                    <Form>
                        <div>
                            <FormGroup>
                                <Label for="exampleEmail" className="required form-label">
                                    View order
                                </Label>
                                <Input
                                    id="vieworder"
                                    name="vieworder"
                                    value={vieworder}
                                    className="form-control form-control-solid"
                                    onChange={(e) => setvieworder(parseInt(e.target.value)
                                    )}
                                    type="number"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail" >
                                    Ghi chú
                                </Label>
                                <Input
                                    id="note"
                                    name="note"
                                    value={note}
                                    className="form-control form-control-solid"
                                    placeholder="..."
                                    onChange={(e) => setNote(e.target.value)}
                                    type="text"
                                />
                            </FormGroup>
                            {role==="ROLE_ADMIN"&&<FormGroup>
                                <Label for="exampleEmail" className="required form-label">
                                    Luồng
                                </Label>
                                <Input
                                    id="max_thread"
                                    name="max_thread"
                                    value={maxthreads}
                                    className="form-control form-control-solid"
                                    onChange={(e) => setMaxthreads(parseInt(e.target.value))}
                                    type="number"
                                />
                            </FormGroup>}
                        </div>
                    </Form>
                </div>
                <div className="modal-footer">
                    <button type="button" onClick={dismissModal} className="btn btn-light" >Thoát</button>
                    <button  type="button"  onClick={submit} style={{backgroundColor:"#26695c",color:"white"}} className="btn">Lưu</button>
                </div>
            </div>
        </Modal>
    )
}
export default EditModal