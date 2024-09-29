import { Card } from "@blueprintjs/core";

export type Semantics = {
  voice: string;
  expression: string;
  impact: string;
  integrity: boolean;
};

const SemanticsPanel: React.FC<Semantics> = ({voice, expression, impact, integrity}) => {
  return (
    <Card>
      <div>
        <h3>Analiza semantyczna</h3>
        <div>
          <h4>Głos</h4>
          <p>{voice}</p>
        </div>
        <div>
          <h4>Ekspresja twarzy</h4>
          <p>{expression}</p>
        </div>
        <div>
          <h4>Ogólny wydźwięk</h4>
          <p>{impact}</p>
        </div>
        <div>
          <h4>Spójność z treścią</h4>
          <p>{integrity ? 'Semantyka spójna z treścią' : 'Semantyka nie spójna z treścią'}</p>
        </div>
      </div>
    </Card>
  )
};

export default SemanticsPanel;
