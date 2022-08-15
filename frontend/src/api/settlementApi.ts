import { mapper } from '../mapping/mapper';
import { Settlement } from '../entities/Settlement.entity';
import { SettlementDto } from '../dto/Settlement.dto';

export default class SettlementApi {
  private path = 'http://localhost:3001/api/settlement';

  public async get(): Promise<Settlement[]> {
    const response = await fetch(this.path);
    await this.checkResponse(response);
    const settlements = await response.json();
    // prettier-ignore
    return settlements.map((i: SettlementDto) => mapper.map<SettlementDto, Settlement>(
      i,
      'SettlementDto',
      'Settlement',
    ));
  }

  protected getHeaders = () => ({
    'Content-Type': 'application/json',
  });

  protected checkResponse = async (res: Response, method = 'GET') => {
    if (!res.ok) {
      const message = await res.json();
      throw new Error(`Failed to ${method} ressource: ${message.message}`);
    }
  };
}
