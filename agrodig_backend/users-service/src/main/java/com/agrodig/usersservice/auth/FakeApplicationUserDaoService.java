package com.agrodig.usersservice.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static com.agrodig.usersservice.security.ApplicationUserRole.ADMIN;


@Repository("fake")
public class FakeApplicationUserDaoService implements ApplicationUserDao{

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public FakeApplicationUserDaoService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Optional<ApplicationUser> selectApplicationUserByUsername(String username) {
        return getApplicationUsers()
                .stream()
                .filter(user->user.getUsername().equals(username))
                .findFirst();
    }

    public List<ApplicationUser> getApplicationUsers(){
        List<ApplicationUser> applicationUsers = List.of(
                new ApplicationUser("chaimaa",
                        passwordEncoder.encode("chaimaa"),
                        ADMIN.getGrantedAuthorities(),
                        true,
                        true,
                        true,
                        true
                )
        );
        return applicationUsers;
    }
}
