import React from 'react';

interface Param {
  id: number;
  name: string;
  type?: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Color {
  color: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: ParamValue[];
}

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    console.log('Props', props);
    super(props);
    this.state = {
      paramValues: props.model.paramValues,
    };
  }

  handleParamChange = (paramId: number, value: string) => {
    const { paramValues } = this.state;
    const updatedParamValues = paramValues.map((paramValue) => {
      if (paramValue.paramId === paramId) {
        return { ...paramValue, value };
      }
      return paramValue;
    });
    this.setState({ paramValues: updatedParamValues });
  };

  getModel = (): Model => {
    const { paramValues } = this.state;
    const { colors } = this.props.model;
    return {
      paramValues,
      colors,
    };
  };

  render() {
    const { params } = this.props;
    const { paramValues } = this.state;

    return (
      <>
        {params?.map((param) => (
          <div
            key={param.id}
            style={{
              width: '50%',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0.5rem',
            }}
          >
            <label htmlFor={`param-${param.id}`}>{param.name}</label>
            <input
              id={`param-${param.id}`}
              type={param.type || 'text'}
              value={
                paramValues.find(
                  (paramValue) => paramValue.paramId === param.id
                )?.value || ''
              }
              onChange={(e) => this.handleParamChange(param.id, e.target.value)}
            />
          </div>
        ))}
      </>
    );
  }
}

const params = [
  {
    id: 1,
    name: 'Назначение',
  },
  {
    id: 2,
    name: 'Длина',
  },
  {
    id: 3,
    name: 'число витков',
    type: 'number',
  },
];

const model = {
  paramValues: [
    {
      paramId: 1,
      value: 'повседневное',
    },
    {
      paramId: 2,
      value: 'макси',
    },
    {
      paramId: 3,
      value: '2',
    },
  ],
  colors: [],
};

const App = () => {
  return (
    <div
      style={{
        padding: '5rem',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <ParamEditor params={params} model={model} />
    </div>
  );
};

export default App;
