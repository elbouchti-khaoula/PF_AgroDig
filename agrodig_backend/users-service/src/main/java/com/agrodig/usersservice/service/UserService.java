package com.agrodig.usersservice.service;

import com.agrodig.usersservice.auth.AuthenticationFacade;
import com.agrodig.usersservice.config.FileConfig;
import com.agrodig.usersservice.dto.SignUpFormDto;
import com.agrodig.usersservice.dto.UserResponseDto;
import com.agrodig.usersservice.exception.user.InvalidEmailException;
import com.agrodig.usersservice.exception.user.InvalidUsernameException;
import com.agrodig.usersservice.exception.user.UserNotAuthenticatedException;
import com.agrodig.usersservice.exception.user.UserNotFoundException;
import com.agrodig.usersservice.mapper.EntityToDto;
import com.agrodig.usersservice.mapper.EntityToDtoMapper;
import com.agrodig.usersservice.model.Image;
import com.agrodig.usersservice.model.User;
import com.agrodig.usersservice.repository.ImageRepository;
import com.agrodig.usersservice.repository.UserRepository;
import com.agrodig.usersservice.security.PasswordConfig;
import com.agrodig.usersservice.utils.FileUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.agrodig.usersservice.security.ApplicationUserRole.USER;

@Transactional
@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationFacade authenticationFacade;
    private final ImageRepository imageRepository;
    private final FileConfig fileConfig;

    public List<UserResponseDto> getUsers() {
        return userRepository.findAll().stream().map(EntityToDtoMapper::userToUserResponseDto).collect(Collectors.toList());
    }

    public User findUserByUsername(String username) throws UserNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(()->new UserNotFoundException(username));
    }

    public User getUserById(Long userID){
        return userRepository.findById(userID).orElseThrow(() ->  new UserNotFoundException());
    }



    public UserResponseDto adminCreateUser(User user) {

        return EntityToDtoMapper.userToUserResponseDto(userRepository.save(user));
    }

    public UserResponseDto singUp(SignUpFormDto signUpForm) {
        userRepository.findByUsername(signUpForm.getUsername())
                .ifPresent(
                        (u)-> {
                            throw new InvalidUsernameException(String.format("username %s is already taken.",u.getUsername()));
                        });
        userRepository.findByEmail(signUpForm.getEmail())
                .ifPresent(
                        (u)-> {
                            throw new InvalidEmailException(String.format("email %s is already taken.",u.getEmail()));
                        });
        String password = signUpForm.getPassword();

        if(!PasswordConfig.isValid(password))
            throw new IllegalStateException("password must contain ..TODO.....");

        User user = new User();
        user.setPassword(passwordEncoder.encode(password));
        user.setUsername(signUpForm.getUsername());
        user.setFirstName(signUpForm.getFirstName());
        user.setLastName(signUpForm.getLastName());
        //TODO: add email validation
        user.setEmail(signUpForm.getEmail());
        user.setRole(USER);

        return EntityToDtoMapper.userToUserResponseDto(userRepository.save(user));
    }

    public void updateEmail(Long userId, String email) {
        User user = userRepository.findById(userId)
                .orElseThrow(()->new IllegalStateException(String.format("user with id %d not found",userId)));
        user.setEmail(email);
        userRepository.save(user);
    }

    public Map<String,String> getAuthenticatedUser() {
        return Map.of(
                "username",authenticationFacade.getAuthenticatedUsername(),
                "role",authenticationFacade.getAuthenticatedUserRole()
        );
    }

    public User getUser(){
        String username = authenticationFacade.getAuthenticatedUsername();

        if(!username.equals("anonymousUser")) {
            return findUserByUsername(username);
        }

        throw new UserNotAuthenticatedException();
    }

    public UserResponseDto getUserResponseDto(){
        return EntityToDtoMapper.userToUserResponseDto(getUser());
    }

    public List<UserResponseDto> getUsersById(List<Long> ids){
        return EntityToDtoMapper.userToUserResponseDto(userRepository.findByIdIn(ids));
    }


    public Image uploadProfilePic(MultipartFile multipartFile){

        Image image = new Image();
        image.setUploadDate(new Date());
        image.setName(multipartFile.getName());
        image.setPath(fileConfig.getDirectory());
        image.setUser(this.getUser());

        String fileName = image.getId()+".png";
        FileUtils.saveFile(multipartFile, fileConfig.getDirectory(),fileName);

        imageRepository.save(image);


        return image;

    }



}

