interface GeneralDevContainerConfig {
  features: Record<string, {}>;
}

interface DevContainerImageConfig extends GeneralDevContainerConfig {
  type: "image";
  image: string;
}
interface DevContainerDockerfileConfig extends GeneralDevContainerConfig {
  type: "dockerfile";
  dockerFile: string;
}
interface DevContainerDockerComposeConfig extends GeneralDevContainerConfig {
  type: "docker-compose";
  dockerComposeFile: string;
}

type DevContainerConfig =
  | DevContainerImageConfig
  | DevContainerDockerfileConfig
  | DevContainerDockerComposeConfig;

export default DevContainerConfig;
export type {
  DevContainerConfig,
  DevContainerDockerComposeConfig,
  DevContainerDockerfileConfig,
  DevContainerImageConfig,
};
