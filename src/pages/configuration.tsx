import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useState } from "react";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/react";
import { Input } from "@nextui-org/input";

import {
  Debate,
  DebateContext,
  DefaultConfig,
  useConfiguration,
} from "@/App.tsx";
import LoadDefaultConfigurations from "@/helpers/debate-configuration.ts";
import BellTimesConfiguration from "@/components/bell-times-configuration.tsx";
import SpeakersConfiguration from "@/components/speakers-configuration.tsx";
import DefaultLayout from "@/layouts/default.tsx";

const ConfigurationPage = () => {
  const { setDebate } = useContext(DebateContext);

  const defaultConfigurations = [...LoadDefaultConfigurations(), DefaultConfig];

  const [editingDebate, setEditingDebate] = useState<Debate | null>(null);
  const [editingConfiguration, setEditingConfiguration] = useConfiguration(
    editingDebate,
    setEditingDebate,
  );

  const navigate = useNavigate();

  const startDebate = useCallback(() => {
    if (editingDebate === null) {
      return;
    }

    setDebate(editingDebate);
    navigate("/debate");
  }, [editingDebate, navigate]);

  return (
    <DefaultLayout title="Debate Configuration">
      <section>
        <div className="flex gap">
          <Select
            className="max-w-64"
            placeholder="Select Debate Configuration"
            onSelectionChange={(selection) => {
              const value = Number.parseInt(selection.currentKey);

              const configuration = defaultConfigurations[value];

              setEditingConfiguration(
                configuration === undefined ? DefaultConfig : configuration,
              );
            }}
          >
            {defaultConfigurations.map((config, index) => {
              return <SelectItem key={index}>{config.name}</SelectItem>;
            })}
          </Select>
          <Input className="flex-grow" placeholder="Topic" type="text" />
          <Button
            color="primary"
            isDisabled={editingDebate === null}
            onClick={startDebate}
          >
            Start Debate
          </Button>
        </div>
      </section>
      {editingDebate !== null && editingConfiguration !== null ? (
        <section className="grid grid-cols-1 md:grid-cols-2 gap">
          <BellTimesConfiguration
            configuration={editingConfiguration}
            setConfiguration={setEditingConfiguration}
          />
          <SpeakersConfiguration
            configuration={editingConfiguration}
            setConfiguration={setEditingConfiguration}
          />
        </section>
      ) : (
        <></>
      )}
    </DefaultLayout>
  );
};

export default ConfigurationPage;
