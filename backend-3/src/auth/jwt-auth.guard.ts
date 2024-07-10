import { Injectable, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.log('Validating request');
    const result = (await super.canActivate(context)) as boolean;
    this.logger.log(`Result: ${result}`);
    const request = context.switchToHttp().getRequest();

    if (result && request.user) {
      this.logger.log(`User: ${JSON.stringify(request.user)}`);
      return true;
    }

    this.logger.warn('Invalid token');
    throw new UnauthorizedException('Invalid token');
  }
}
