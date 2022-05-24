import {
  CACHE_MANAGER,
  CallHandler,
  ExecutionContext,
  Inject,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { catchError, Observable, throwError } from 'rxjs';

export class JwtCheckInterceptor implements NestInterceptor {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();

    const jwt = req.cookies.refreshToken ?? req.headers.authorization;
    const jwtIsBlocked: boolean =
      (await this.cacheManager.get(`BLOCKED_JWT_${jwt}`)) !== null;
    console.log(jwtIsBlocked);
    if (jwtIsBlocked)
      return next
        .handle()
        .pipe(catchError(() => throwError(() => new UnauthorizedException())));
    return next.handle();
  }
}
