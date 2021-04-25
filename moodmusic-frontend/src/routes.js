import Camera from './views/pages/camera/Camera';
import Playback from './views/pages/playback/playback';
import Track from './views/pages/tracks/tracks';

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/camera', name: 'Camera', component: Camera },
  { path: '/playback', name: 'Playback', component: Playback },
  { path: '/tracks', name: 'Track', component: Track },
];

export default routes;
