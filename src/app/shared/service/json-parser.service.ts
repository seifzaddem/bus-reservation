import {Injectable} from '@angular/core';
import {Logger} from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class JsonParserService {

  constructor(private logger: Logger) {
  }

  public parseString(unparsedString: string) {
    let parsedObject: any[];
    if (unparsedString) {
      try {
        parsedObject = JSON.parse(unparsedString);
        if (!Array.isArray(parsedObject)) {
          this.logger.error(`Unable to parse data from Local Storage ${unparsedString}`);
          parsedObject = [];
        }
      } catch (e) {
        this.logger.error(`Unable to parse data from Local Storage ${unparsedString}`);
      }
    }
    return parsedObject

  }
}
