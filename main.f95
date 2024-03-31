program symplectic_all_to_all
  implicit none
  integer, parameter :: ndim = 1000
  real, dimension(ndim) :: omega1, omega2, theta1in, theta2in
  real, dimension(ndim) :: theta1out, theta2out, dydt1, dydt2
  real :: omega_mean1, omega_mean2, alpha, alpha2
  integer, dimension(ndim, ndim) :: a2, a1
  real :: h, t, r1_final, r2_final, shi1, shi2, lambda1_step
  real :: lambda1, lambda2, Dx, coup1, coup2, add1, add2, lambda1_max
  real :: rx1, rx2, ry1, ry2, r1, r2, x
  real :: rho1, rho2, phi1, phi2, lambda3, lambda1_min
  real :: rhox1, rhox2, rhoy1, rhoy2, rho1_final, rho2_final
  real :: pi
  integer :: i, it, nstep, itrans, nlines1, nlines2,j
  character(len=10) :: format_str
  
  interface
    subroutine rk4(alpha2, lambda2, Dx, r1, r2, n, omega1, omega2, &
                   lambda1, y1, y2, dydt1, dydt2, t, h, yout1, yout2, &
                   shi1, shi2, rho1, rho2, phi1, phi2, lambda3)
      real, intent(in) :: alpha2, lambda2, Dx, r1, r2, t, omega1(:), omega2(:), lambda1
      real, intent(in) :: y1(:), y2(:), h, shi1, shi2, rho1, rho2, phi1, phi2, lambda3
      integer, intent(in) :: n
      real, intent(out) :: dydt1(:), dydt2(:), yout1(:), yout2(:)
    end subroutine rk4
    
    subroutine derivs(alpha2, lambda2, Dx, r1, r2, t, omega1, omega2, &
                       lambda1, theta1in, theta2in, dydt1, dydt2, &
                      shi1, shi2, rho1, rho2, phi1, phi2, lambda3)
      real, intent(in) :: alpha2, lambda2, Dx, r1, r2,  t, omega1(:), omega2(:), lambda1
      real, intent(in) :: theta1in(:), theta2in(:), shi1, shi2, rho1, rho2, phi1, phi2, lambda3
      real, intent(out) :: dydt1(:), dydt2(:)
    end subroutine derivs
  end interface
  
  h = 0.01
  nstep = 20000
  t = 0.0
  itrans = 10000
  pi = 4.0 * atan(1.0)
  
  ! Change these parameters according to the differential equation
  
  lambda2 = 8.0
  lambda3 = 0.0
  lambda1_step = 0.2
  lambda1_max = 3.0
  lambda1_min = 1.0
  
  ! Lorenzian frequency distribution
  alpha = 1.0
  do i = 1, ndim
    omega1(i) = alpha * tan((i * pi) / ndim - ((ndim + 1) * pi) / (2 * ndim))
    omega2(i) = alpha * tan((i * pi) / ndim - ((ndim + 1) * pi) / (2 * ndim))
    omega_mean1 = omega_mean1 + omega1(i)
    omega_mean2 = omega_mean2 + omega2(i)
  end do
  omega_mean1 = omega_mean1 / ndim
  omega_mean2 = omega_mean2 / ndim
  
  do i = 1, ndim
    call random_number(theta1in(i))
    theta1in(i) = -pi + 2 * pi * theta1in(i)  ! Initial conditions for theta in forward direction
    theta2in(i) = 2 * pi
  end do
  
  lambda1 = lambda1_min  ! Change here for forward and backward
  do while (lambda1 <= lambda1_max)
    lambda1 = lambda1 + lambda1_step
    r1 = 0.0
    r2 = 0.0
    r1_final = 0.0
    r2_final = 0.0
    rho1 = 0.0
    rho2 = 0.0
    rho1_final = 0.0
    rho2_final = 0.0
    
    ! Evolving in time
    do it = 1, nstep
      ! Calculations for order parameters r1, r2, rho1, and rho2
      rx1 = sum(cos(theta1in))
      ry1 = sum(sin(theta1in))
      rx2 = sum(cos(2.0 * theta1in))
      ry2 = sum(sin(2.0 * theta1in))
      rhox1 = sum(cos(theta2in))
      rhoy1 = sum(sin(theta2in))
      rhox2 = sum(cos(2.0 * theta2in))
      rhoy2 = sum(sin(2.0 * theta2in))
      
      r1 = sqrt(rx1**2 + ry1**2) / ndim
      r2 = sqrt(rx2**2 + ry2**2) / ndim
      rho1 = sqrt(rhox1**2 + rhoy1**2) / ndim
      rho2 = sqrt(rhox2**2 + rhoy2**2) / ndim
      shi1 = atan2(ry1, rx1)
      shi2 = atan2(ry2, rx2)
      phi1 = atan2(rhoy1, rhox1)
      phi2 = atan2(rhoy2, rhox2)
      
      call rk4(alpha2, lambda2, Dx, r1, r2, ndim, omega1, omega2, lambda1, &
               theta1in, theta2in, dydt1, dydt2, t, h, theta1out, theta2out, &
               shi1, shi2, rho1, rho2, phi1, phi2, lambda3)
      
      theta1in = modulo(theta1out, 2.0 * pi)
      theta2in = modulo(theta2out, 2.0 * pi)
      
      if (it > itrans) then
        r1_final = r1_final + r1
        r2_final = r2_final + r2
        rho1_final = rho1_final + rho1
        rho2_final = rho2_final + rho2
      end if
    end do
    
    r1_final = r1_final / (nstep - itrans)
    r2_final = r2_final / (nstep - itrans)
    rho1_final = rho1_final / (nstep - itrans)
    rho2_final = rho2_final / (nstep - itrans)
    
    write(*, '(3(F12.6,1X))') lambda1, r1_final, r2_final
    open(unit=21, file='output_file.txt', position='append', action='write')
    write(21, '(3(F12.6,1X))') lambda1, r1_final, r2_final
    close(21)
  end do
  
  do j = 1, ndim
    print *, theta1in(j), theta2in(j)
  end do
  
end program symplectic_all_to_all

subroutine rk4(alpha2, lambda2, Dx, r1, r2, n, omega1, omega2, &
               lambda1, y1, y2, dydt1, dydt2, t, h, yout1, yout2, &
               shi1, shi2, rho1, rho2, phi1, phi2, lambda3)
  real, intent(in) :: alpha2, lambda2, Dx, r1, r2, t, omega1(:), omega2(:), lambda1
  real, intent(in) :: y1(:), y2(:), h, shi1, shi2, rho1, rho2, phi1, phi2, lambda3
  integer, intent(in) :: n
  real, intent(out) :: dydt1(:), dydt2(:), yout1(:), yout2(:)
  integer :: i
  real :: h6, hh, th
  real, allocatable :: dym1(:), dyt1(:), yt1(:), dym2(:), dyt2(:), yt2(:)
  
  allocate(dym1(n), dyt1(n), yt1(n), dym2(n), dyt2(n), yt2(n))
  
  hh = h * 0.5
  h6 = h / 6.0
  th = t + hh
  
  call derivs(alpha2, lambda2, Dx, r1, r2, t, omega1, omega2, &
              lambda1, y1, y2, dydt1, dydt2, shi1, shi2, rho1, rho2, phi1, phi2, lambda3)
  
  yt1 = y1 + hh * dydt1
  yt2 = y2 + hh * dydt2
  
  call derivs(alpha2, lambda2, Dx, r1, r2,  th, omega1, omega2, &
              lambda1, yt1, yt2, dyt1, dyt2, shi1, shi2, rho1, rho2, phi1, phi2, lambda3)
  
  yt1 = y1 + hh * dyt1
  yt2 = y2 + hh * dyt2
  
  call derivs(alpha2, lambda2, Dx, r1, r2,  th, omega1, omega2, &
              lambda1, yt1, yt2, dym1, dym2, shi1, shi2, rho1, rho2, phi1, phi2, lambda3)
  
  yt1 = y1 + h * dym1
  dym1 = dyt1 + dym1
  yt2 = y2 + h * dym2
  dym2 = dyt2 + dym2
  
  call derivs(alpha2, lambda2, Dx, r1, r2,  t + h, omega1, omega2, &
              lambda1, yt1, yt2, dyt1, dyt2, shi1, shi2, rho1, rho2, phi1, phi2, lambda3)
  
  do i = 1, n
    yout1(i) = y1(i) + h6 * (dydt1(i) + dyt1(i) + 2.0 * dym1(i))
    yout2(i) = y2(i) + h6 * (dydt2(i) + dyt2(i) + 2.0 * dym2(i))
  end do
  
  deallocate(dym1, dyt1, yt1, dym2, dyt2, yt2)
end subroutine rk4

subroutine derivs(alpha2, lambda2, Dx, r1, r2,  t, omega1, omega2, &
                   lambda1, theta1in, theta2in, dydt1, dydt2, &
                  shi1, shi2, rho1, rho2, phi1, phi2, lambda3)
  real, intent(in) :: alpha2, lambda2, Dx, r1, r2,  t, omega1(:), omega2(:), lambda1
  real, intent(in) :: theta1in(:), theta2in(:), shi1, shi2, rho1, rho2, phi1, phi2, lambda3
  real, intent(out) :: dydt1(:), dydt2(:)
  integer :: i
  real :: sigma1, sigma2, sigma3
  
  sigma1 = 0.0
  sigma2 = 0.0
  sigma3 = 0.0
  
  do i = 1, ndim
    dydt1(i) = omega1(i) + lambda1 * (r1) * sin(shi1 - theta1in(i)) + &
               lambda2 * r1 * r2 * sin(shi2 - shi1 - theta1in(i)) + &
               lambda3 * r1 * r1 * rho1 * sin(shi1 - theta1in(i))
    
    dydt2(i) = omega2(i) + sigma1 * rho1 * sin(phi1 - theta2in(i)) + &
               sigma2 * rho1 * rho2 * sin(phi2 - phi1 - theta2in(i)) + &
               sigma3 * rho1 * rho1 * rho1 * sin(phi1 - theta2in(i))
  end do
end subroutine derivs