import { expect } from 'chai';
import UserModel from '../../model/User.mjs';
import { onBefore, onAfter } from '../helper.js';

onBefore(); // creates database
onAfter(); // deletes the database

describe('Users Model', () => {
  describe('Create and save user with instructor role', () => {
    it('should create and save user successfully', async () => {
      const mockUser = {
        firstName: 'John',
        lastName: 'Snow',
        email: 'snow@thewall.com',
        password: 'password1234',
        role: 'instructor',
        isVerified: true
      };
      try {
        const user = new UserModel(mockUser);
        const savedUser = await user.save();
        await expect(savedUser.firstName).to.be.equal(mockUser.firstName);
        await expect(savedUser.lastName).to.be.equal(mockUser.lastName);
        await expect(savedUser.email).to.be.equal(mockUser.email);
        await expect(savedUser.role).to.be.equal(mockUser.role);
        await expect(savedUser.isVerified).to.be.equal(mockUser.isVerified);
      } catch (error) {
        console.log(error.message);
      }
    });
  });

  describe('Create and save user with client role', () => {
    it('should create and save user successfully', async () => {
      const mockUser = {
        firstName: 'John',
        lastName: 'Snow',
        email: 'snow@thewall.com',
        password: 'password1234',
        role: 'client'
      };
      try {
        const user = new UserModel(mockUser);
        const savedUser = await user.save();
        await expect(savedUser.firstName).to.be.equal(mockUser.firstName);
        await expect(savedUser.lastName).to.be.equal(mockUser.lastName);
        await expect(savedUser.email).to.be.equal(mockUser.email);
        await expect(savedUser.role).to.be.equal(mockUser.role);
      } catch (error) {
        console.log(error.message);
      }
    });
  });
});
