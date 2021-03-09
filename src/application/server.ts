import app from './app';
import { PORT } from '../infrastructure/entrypoint/util/constants/constants';
const opPort = process.env.port || PORT;

app.listen(PORT, () => console.info(`Server running on port ${PORT}`));