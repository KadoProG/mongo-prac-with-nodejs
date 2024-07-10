import { Injectable, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  private readonly logger = new Logger(LocalAuthGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.log('Validating request');
    const result = (await super.canActivate(context)) as boolean;
    this.logger.log(`Result: ${result}`);
    const request = context.switchToHttp().getRequest();

    if (result && request.user) {
      this.logger.log(`User: ${JSON.stringify(request.user)}`);
      return true;
    }

    this.logger.warn('Invalid credentials');
    throw new UnauthorizedException('Invalid credentials');
  }
}
