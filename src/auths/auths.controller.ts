import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Post, UsePipes, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';

import { AuthsService } from './auths.service';

import { AuthSignUpDto, AuthSignInDto, AuthActivateDto, AuthPasswordForgotDto, PasswordResetDto, AuthRefreshTokenDto } from './dto';

import { IAuthSignInOutput } from './interfaces/authSignInOutput.interface';

import { Roles } from '../shared/roles.decorator';
import { RolesGuard } from '../shared/role.guard';

@ApiUseTags('Auth')
@Controller('auth')
export class AuthsController {
  constructor(
    private readonly authsService: AuthsService,
  ) { }

  /**
   * SignUp/Create User
   * @param signUpInputDto
   */
  @Post('/signup')
  @UsePipes(new ValidationPipe())
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 409, description: 'User exists.' })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  async signUp(@Body() signUpInputDto: AuthSignUpDto): Promise<boolean> {
    await this.authsService.signUp(signUpInputDto);
    return true;
  }

  /**
   * Sign in (Log in to use account)
   * @param signInInputDto
   */
  @Post('/signin')
  @Roles(['USER_REGULAR'])
  @UsePipes(new ValidationPipe())
  @ApiResponse({ status: 201, description: 'The user has been successfully signed in.' })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  signIn(@Body() authSignInDto: AuthSignInDto): Promise<IAuthSignInOutput> {
    return this.authsService.signIn(authSignInDto.username, authSignInDto.password);
  }

  /**
   * Activate Sign Up/Activate user account
   * @param signUpActivateDto
   * @param req
   */
  @Post('/activate/me')
  @ApiBearerAuth()
  @Roles(['USER_REGULAR'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(new ValidationPipe())
  @ApiResponse({ status: 201, description: 'The user has been successfully activated.' })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  activateSignUp(@Body() signUpActivateDto: AuthActivateDto, @Req() req): Promise<boolean> {
    const { user } = req;
    return this.authsService.activateSignUp(user._id, signUpActivateDto);
  }

  /**
   * Sends password forgot token to user email
   * @param passwordForgotDto
   */
  @Post('/password-forgot')
  @UsePipes(new ValidationPipe())
  @ApiResponse({ status: 201, description: 'Forgot password email has been successfully sent.' })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  passwordForgotDto(@Body() passwordForgotDto: AuthPasswordForgotDto): Promise<boolean> {
    return this.authsService.sendForgotPasswordToken(passwordForgotDto.email);
  }

  /**
   * Sets a new password
   * @param passwordResetDto
   */
  @Post('/password-reset')
  @UsePipes(new ValidationPipe())
  @ApiResponse({ status: 201, description: 'New password has been successfully set.' })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  passwordReset(@Body() passwordResetDto: PasswordResetDto): Promise<boolean> {
    return this.authsService.resetPassword(passwordResetDto.email, passwordResetDto.password, passwordResetDto.token);
  }

  @Post('/refresh-token')
  @ApiResponse({ status: 201, description: 'New tokens pair has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  refreshToken(@Body() refreshTokenData: AuthRefreshTokenDto): Promise<IAuthSignInOutput> {
    return this.authsService.refreshToken(refreshTokenData);
  }
}
