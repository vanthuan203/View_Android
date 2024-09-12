import React, {useState, useEffect} from 'react'
import {KTSVG, toAbsoluteUrl} from '_metronic/helpers'
import {AccountModel} from 'app/modules/services/models/Account'
import {useDispatch} from 'react-redux'
import {actions} from '../../redux/AccountRedux'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button, Modal, ModalFooter,
    ModalHeader, ModalBody, Input, FormGroup, Label
} from "reactstrap"


type Props = {
    item: AccountModel
}

function format1(n: number) {
    return n.toFixed(0).replace(/./g, function (c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
}

const EditModal: React.FC<Props> = ({item}) => {
    const dispatch = useDispatch()
    const API_URL = process.env.REACT_APP_API_URL
    const [check_time, set_check_time] = useState(item.check_time)
    const [device_type, set_device_type] = useState(item.device_type)
    const [enabled, set_enabled] = useState(item.enabled)
    const [expired, set_expired] = useState(item.expired)
    const [max_order, set_max_order] = useState(item.max_order)
    const [max_quantity, set_max_quantity] = useState(item.max_quantity)
    const [min_quantity, set_min_quantity] = useState(item.min_quantity)
    const [max_time, set_max_time] = useState(item.max_time)
    const [min_time, set_min_time] = useState(item.min_time)
    const [note, set_note] = useState(item.note)
    const [geo, set_geo] = useState(item.geo)
    const [platform, set_platform] = useState(item.platform)
    const [refund, set_refund] = useState(item.refund)
    const [refund_time, set_refund_time] = useState(item.refund_time)
    const [service_category, set_service_category] = useState(item.service_category)
    const [service_name, set_service_name] = useState(item.service_name)
    const [service_rate, set_service_rate] = useState(item.service_rate)
    const [service_type, set_service_type] = useState(item.service_type)
    const [task, set_task] = useState(item.task)
    const [thread, set_thread] = useState(item.thread)
    const [website_click_ads, set_website_click_ads] = useState(item.website_click_ads)
    const [website_click_web, set_website_click_web] = useState(item.website_click_web)
    const [youtube_suggest, set_youtube_suggest] = useState(item.youtube_suggest)
    const [youtube_direct, set_youtube_direct] = useState(item.youtube_direct)
    const [youtube_dtn, set_youtube_dtn] = useState(item.youtube_dtn)
    const [youtube_embed, set_youtube_embed] = useState(item.youtube_embed)
    const [youtube_external, set_youtube_external] = useState(item.youtube_external)
    const [youtube_key_niche, set_youtube_key_niche] = useState(item.youtube_key_niche)
    const [youtube_niche, set_youtube_niche] = useState(item.youtube_niche)
    const [youtube_playlists, set_youtube_playlists] = useState(item.youtube_playlists)
    const [youtube_reply, set_youtube_reply] = useState(item.youtube_reply)
    const [youtube_search, set_youtube_search] = useState(item.youtube_search)
    const [bonus, set_bonus] = useState(item.bonus)
    const [check_done, set_check_done] = useState(item.check_done)
    const [check_count, set_check_count] = useState(item.check_count)

    const dismissModal = () => {
        dispatch(actions.clearCurrentAccount())
    }
    const updateUser = () => {
        if (service_rate < 0) {
            alert("rate không hợp lệ!")
            return
        }
        if (min_time < 0) {
            alert("min_time không hợp lệ!")
            return
        }
        if (max_time < 0) {
            alert("max_time không hợp lệ!")
            return
        }
        if (max_quantity < 0) {
            alert("max_quantity không hợp lệ!")
            return
        }
        if (min_quantity < 0) {
            alert("min_quantity không hợp lệ!")
            return
        }
        if (thread < 0) {
            alert("thread không hợp lệ!")
            return
        }
        if (bonus < 0) {
            alert("bonus không hợp lệ!")
            return
        }
        dispatch(actions.requestUpdate({
            ...item,
            check_time,
            device_type,
            enabled,
            expired,
            max_order,
            max_quantity,
            min_quantity,
            max_time,
            min_time,
            note,
            geo,
            platform,
            refund,
            refund_time,
            service_category,
            service_name,
            service_rate,
            service_type,
            task,
            thread,
            website_click_ads,
            website_click_web,
            youtube_suggest,
            youtube_direct,
            youtube_dtn,
            youtube_embed,
            youtube_external,
            youtube_key_niche,
            youtube_niche,
            youtube_playlists,
            youtube_reply,
            youtube_search,
            bonus,
            check_done,
            check_count,
        }))
    }

    return (
        <Modal isOpen={true}
               modalTransition={{timeout: 500}}>
            <div className="modal-content">
                <div className="modal-header">
                    <h3 style={{fontWeight: 'bold', fontFamily: 'monospace'}}
                        className="modal-title">Update Service: {item?.service_id}</h3>
                    <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" aria-label="Close">
                        <span className="svg-icon svg-icon-2x"></span>
                    </div>
                </div>
                <div className='modal-body'>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Name Service
                        </Label>
                        <Input style={{fontWeight: 'bold'}} value={service_name} type="text" className="form-control"
                               aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => set_service_name(e.target.value)}></Input>
                    </FormGroup>

                </div>
                {item.platform=="youtube"&&<div className='modal-body flex flex-row justify-between space-x-6'>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Suggest
                        </Label>
                        <Input
                            id="suggest"
                            name="suggest"
                            value={youtube_suggest}
                            className="form-control form-control-solid"
                            placeholder="ví dụ : 100"
                            onChange={(e) => set_youtube_suggest(parseInt(e.target.value))}
                            type="number"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Search
                        </Label>
                        <Input
                            id="search"
                            name="search"
                            value={youtube_search}
                            className="form-control form-control-solid"
                            placeholder="ví dụ : 100"
                            onChange={(e) => set_youtube_search(parseInt(e.target.value))}
                            type="number"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Browse Features
                        </Label>
                        <Input
                            id="suggest"
                            name="suggest"
                            value={youtube_dtn}
                            className="form-control form-control-solid"
                            placeholder="ví dụ : 100"
                            onChange={(e) => set_youtube_dtn(parseInt(e.target.value))}
                            type="number"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            External
                        </Label>
                        <Input
                            id="thread"
                            name="thread"
                            value={youtube_external}
                            className="form-control form-control-solid"
                            placeholder="ví dụ : 100"
                            onChange={(e) => set_youtube_external(parseInt(e.target.value))}
                            type="number"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Embed
                        </Label>
                        <Input
                            id="suggest"
                            name="suggest"
                            value={youtube_embed}
                            className="form-control form-control-solid"
                            placeholder="ví dụ : 100"
                            onChange={(e) => set_youtube_embed(parseInt(e.target.value))}
                            type="number"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Direct
                        </Label>
                        <Input
                            id="maxtime"
                            name="maxtime"
                            value={youtube_direct}
                            className="form-control form-control-solid"
                            placeholder="ví dụ : 100"
                            onChange={(e) => set_youtube_direct(parseInt(e.target.value))}
                            type="number"
                        />
                    </FormGroup>
                </div>}
                <div className='modal-body flex flex-row justify-between space-x-6'>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Min Quantity
                        </Label>
                        <Input
                            id="suggest"
                            name="suggest"
                            value={min_quantity}
                            className="form-control form-control-solid"
                            placeholder="ví dụ : 100"
                            onChange={(e) => set_min_quantity(parseInt(e.target.value))}
                            type="number"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Max Quantity
                        </Label>
                        <Input
                            id="search"
                            name="search"
                            value={max_quantity}
                            className="form-control form-control-solid"
                            placeholder="ví dụ : 100"
                            onChange={(e) => set_max_quantity(parseInt(e.target.value))}
                            type="number"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Max Orders
                        </Label>
                        <Input
                            id="suggest"
                            name="suggest"
                            value={max_order}
                            className="form-control form-control-solid"
                            placeholder="ví dụ : 100"
                            onChange={(e) => set_max_order(parseInt(e.target.value))}
                            type="number"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Default Threads
                        </Label>
                        <Input
                            id="thread"
                            name="thread"
                            value={thread}
                            className="form-control form-control-solid"
                            placeholder="ví dụ : 100"
                            onChange={(e) => set_thread(parseInt(e.target.value))}
                            type="number"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Min Retention
                        </Label>
                        <Input
                            id="suggest"
                            name="suggest"
                            value={min_time}
                            className="form-control form-control-solid"
                            placeholder="ví dụ : 100"
                            onChange={(e) => set_min_time(parseInt(e.target.value))}
                            type="number"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Max Retention
                        </Label>
                        <Input
                            id="maxtime"
                            name="maxtime"
                            value={max_time}
                            className="form-control form-control-solid"
                            placeholder="ví dụ : 100"
                            onChange={(e) => set_max_time(parseInt(e.target.value))}
                            type="number"
                        />
                    </FormGroup>
                </div>


                <div className='modal-body flex flex-row justify-between space-x-6'>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Bonus(%)
                        </Label>
                        <Input
                            id="suggest"
                            name="suggest"
                            value={bonus}
                            className="form-control form-control-solid"
                            placeholder="ví dụ : 100"
                            onChange={(e) => set_bonus(parseInt(e.target.value))}
                            type="number"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Guarantee
                        </Label>
                        <Input style={{fontWeight: "bold"}}
                               onChange={(e) => set_refund(parseInt(e.target.value))}
                               className="form-control form-control-solid"
                               type="select"
                               value={refund}
                        >
                            <option key={"1"} value={1}>
                                Yes Guarantee
                            </option>
                            <option key={"0"} value={0}>
                                No Guarantee
                            </option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Day Refund
                        </Label>
                        <Input style={{fontWeight: "bold"}}
                               onChange={(e) => set_refund_time(parseInt(e.target.value))}
                               className="form-control form-control-solid"
                               type="select"
                               value={refund_time}
                        >
                            <option key={"0"} value={0}>
                                No Refund
                            </option>
                            <option key={"3"} value={3}>
                                3 days Refund
                            </option>
                            <option key={"7"} value={7}>
                                7 days Refund
                            </option>
                            <option key={"15"} value={15}>
                                15 days Refund
                            </option>
                            <option key={"30"} value={30}>
                                30 days Refund
                            </option>
                            <option key={"60"} value={60}>
                                60 days Refund
                            </option>
                            <option key={"90"} value={90}>
                                90 days Refund
                            </option>
                            <option key={"100000"} value={100000}>
                                Lifetime
                            </option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Check Time
                        </Label>
                        <Input style={{fontWeight: "bold"}}
                               onChange={(e) => set_check_time(parseInt(e.target.value))}
                               className="form-control form-control-solid"
                               type="select"
                               value={check_time}
                        >
                            <option key={"1"} value={1}>
                                Yes
                            </option>
                            <option key={"0"} value={0}>
                                No
                            </option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Rate($)
                        </Label>
                        <Input
                            id="rate"
                            name="rate"
                            value={service_rate}
                            className="form-control form-control-solid"
                            placeholder="ví dụ : 100"
                            onChange={(e) => set_service_rate(parseFloat(e.target.value))}
                            type="number"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Enabled
                        </Label>
                        <Input style={{fontWeight: "bold"}}
                               onChange={(e) => set_enabled(parseInt(e.target.value))}
                               className="form-control form-control-solid"
                               type="select"
                               value={enabled}
                        >
                            <option key={"on"} value={1}>
                                ON
                            </option>
                            <option key={"off"} value={0}>
                                OFF
                            </option>
                        </Input>
                    </FormGroup>
                </div>

            </div>
            <div className="modal-footer">
                <button type="button" onClick={dismissModal} className="btn btn-light">Thoát</button>
                <button type="button" onClick={updateUser} style={{backgroundColor: "#26695c", color: "white"}}
                        className="btn ">Lưu
                </button>
            </div>

        </Modal>
    )
}

export default EditModal