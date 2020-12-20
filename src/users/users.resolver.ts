import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/role.decorator';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/createAccount.dto';
import { EditProfileInput, EditProfileOutput } from './dtos/editProfile.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { UserProfileInput, UserProfileOutput } from './dtos/uesrProfile.dto';
import { VerifyEmailInput, VerifyEmailOutput } from './dtos/verifyEmail.dto';
import { User } from './entities/user.entity';
import { UserService } from './users.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => CreateAccountOutput)
  createAccount(@Args('input') createAccountInput: CreateAccountInput) {
    return this.userService.createAcount(createAccountInput);
  }

  @Mutation(() => LoginOutput)
  login(@Args('input') loginInput: LoginInput) {
    return this.userService.login(loginInput);
  }

  @Query(() => User)
  @Role(['Any'])
  me(@AuthUser() authUser: User) {
    return authUser;
  }

  @Query(() => UserProfileOutput)
  @Role(['Any'])
  userProfile(@Args() userProfileInput: UserProfileInput) {
    return this.userService.findById(userProfileInput.userId);
  }

  @Role(['Any'])
  @Mutation(() => EditProfileOutput)
  editProfile(
    @AuthUser() authUser: User,
    @Args('input') editProfileInput: EditProfileInput,
  ) {
    return this.userService.editProfile(authUser.id, editProfileInput);
  }

  @Mutation(() => VerifyEmailOutput)
  verifyEmail(@Args('input') { code }: VerifyEmailInput) {
    return this.userService.verifyEmail(code);
  }
}
