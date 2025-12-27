import java.util.Scanner;
import java.util.Random;

public class NumberGuessingGame {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Random random = new Random();
        
        int numberToGuess = random.nextInt(50) + 1;
        int maxAttempts = 5;
        int attemptsLeft = maxAttempts;
        boolean hasWon = false;
        
        System.out.println("\nWelcome to the Number Guessing Game!");
        System.out.println("I have selected a number between 1 and 50.");
        System.out.println("You have " + maxAttempts + " attempts to guess it.");
        
        while (attemptsLeft > 0) {
            System.out.print("\nEnter your guess: ");
            int guess = scanner.nextInt();
            
            if (guess == numberToGuess) {
                hasWon = true;
                break;
            } else if (guess < numberToGuess) {
                System.out.println("Too low! Try again.");
            } else {
                if (Math.abs(guess - numberToGuess) <= 3) {
                    System.out.println("You are too close to the number!");
                } else {
                    System.out.println("Too high! Try again.");
                }
            }
            
            attemptsLeft--;
            System.out.println("Attempts remaining: " + attemptsLeft);
        }
        
        if (hasWon) {
            System.out.println("\nCongratulations! You guessed the number.");
        } else {
            System.out.println("\nGame Over! The number was: " + numberToGuess);
        }
        
        scanner.close();
    }
}
