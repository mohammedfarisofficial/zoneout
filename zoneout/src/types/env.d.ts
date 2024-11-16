declare module '@env' {
    export const REACT_APP_MAPBOX_ACCESS_TOKEN: string;
  }

  declare module '*.svg' {
    const content: string;
    export default content;
  }