import Dynamic from '../components/Dynamic/index'

const App = () => {
  const formConfig = [
    {
      name: 'cateId',
      label: '分类字段',
      comp: 'input',
      rules: true,
    },
    {
      name: 'iddd',
      label: '城市',
      comp: 'select',
      placeholder: "Search to Select",
      allowClear: true,
      options: [
        {
          value: '11',
          label: '选择'
        }
      ]
    },
  ]

  const formOption = {
   
  }

  return (<Dynamic formConfig={formConfig} formOption={formOption}></Dynamic>)
};
export default App;