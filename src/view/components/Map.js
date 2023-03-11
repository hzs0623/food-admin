import './index.css'
import { message, Modal, Form, Input, Button } from 'antd'
import { getBit } from '../../utils/index'

export default function App(props = {}) {
    const [messageApi, contextHolder] = message.useMessage();
    let map
    function getLocationData(mapData) {
        if (map) {
            map.setCenter(mapData.city)
        } else {
            map = new BMapGL.Map("container-map");
            // map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
            map.centerAndZoom(mapData.city, 12); // 设置中心点坐标和地图级别 12放大级别
            map.addEventListener('click', function showInfo(e) {
                const { lng, lat  } = e.latlng
                const longitude = getBit(lng, 4) // 截取小数点后4位 后端只支持4位
                const latitude = getBit(lat, 4) // 截取小数点后4位 后端只支持4位
                props.change({ latitude, longitude })
                messageApi.success('经纬度：' + e.latlng.lng + ',' + e.latlng.lat);
            });
        }
        
        const local = new BMapGL.LocalSearch(map, {
            renderOptions: { map }
        });     
        mapData.sity && local.search(mapData.sity);
    }

    const submitForm = (data) => {
        getLocationData(data)
    }

    return <>
        {contextHolder}

        <Modal width={ 800 } bodyStyle={{  height: '700px' } } title="地图选择" onCancel={ props.onCancel } footer={null} open={ props.open }>
           <Form layout="inline" onFinish={submitForm}>
                <Form.Item name="city" label="城市" rules={[{ required: true }]}>
                    <Input placeholder="请输入城市" />
                </Form.Item>

                <Form.Item name="sity" label="详细地址">
                    <Input placeholder="请输入详细地址" />
                </Form.Item>

                <Form.Item shouldUpdate>
                    {() => (
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            查询
                        </Button>
                    )}
                </Form.Item>
            </Form>

            <div style={{ marginTop: 20 }} id="container-map"></div>
        </Modal>
    </>
}
