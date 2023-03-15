import { Theme } from '@mui/material/styles';

import { Card } from './card';
import { Chip } from './chip';
import { Link } from './link';
import { List } from './list';
import { Menu } from './menu';
import { Tabs } from './tabs';
import { Input } from './input';
import { Paper } from './paper';
import { Table } from './table';
import { Radio } from './radio';
import { Alerts } from './alerts';
import { Button } from './button';
import { Dialog } from './dialog';
import { Rating } from './rating';
import { Select } from './select';
import { Slider } from './slider';
import { Avatar } from './avatars';
import { Divider } from './divider';
import { Popover } from './popover';
import { Tooltip } from './tooltip';
import { Checkbox } from './checkbox';
import { Backdrop } from './backdrop';
import { DataGrid } from './dataGrid';
import { Progress } from './progress';
import { Snackbar } from './snackbar';
import { Switches } from './switches';
import { Timeline } from './timeline';
import { Accordion } from './accordion';
import { Pagination } from './pagination';
import { Typography } from './typography';
import { Breadcrumb } from './breadcrumbs';
import { Autocomplete } from './autocomplete';
import { ToggleButton } from './toggleButton';
import { Settings } from '@/types/app/settings';

export const Overrides = (theme: Theme, settings: Settings) => {
  const { skin } = settings;

  const button = Button(theme);
  const chip = Chip(theme);
  const list = List(theme);
  const tabs = Tabs(theme);
  const radio = Radio(theme);
  const input = Input(theme);
  const tables = Table(theme);
  const alerts = Alerts(theme);
  const rating = Rating(theme);
  const slider = Slider(theme);
  const avatars = Avatar(theme);
  const divider = Divider(theme);
  const menu = Menu(theme, skin);
  const tooltip = Tooltip(theme);
  const cards = Card(theme, skin);
  const checkbox = Checkbox(theme);
  const backdrop = Backdrop(theme);
  const dataGrid = DataGrid(theme);
  const progress = Progress(theme);
  const switches = Switches(theme);
  const timeline = Timeline(theme);
  const accordion = Accordion(theme);
  const dialog = Dialog(theme, skin);
  const pagination = Pagination(theme);
  const popover = Popover(theme, skin);
  const breadcrumb = Breadcrumb(theme);
  const snackbar = Snackbar(theme, skin);
  const autocomplete = Autocomplete(theme, skin);

  return Object.assign(
    chip,
    list,
    menu,
    tabs,
    cards,
    radio,
    input,
    alerts,
    button,
    dialog,
    rating,
    slider,
    tables,
    avatars,
    divider,
    Link,
    popover,
    tooltip,
    checkbox,
    backdrop,
    dataGrid,
    Paper,
    progress,
    snackbar,
    switches,
    timeline,
    accordion,
    Select,
    breadcrumb,
    pagination,
    autocomplete,
    Typography,
    ToggleButton,
  );
};
