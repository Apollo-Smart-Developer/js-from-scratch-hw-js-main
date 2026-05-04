/*
  Нужно написать функцию capitalizeWords, которая принимает строку и делает так, чтобы каждое слово начиналось с заглавной буквы.
  Например, если передать строку "hello world from javascript", функция должна вернуть "Hello World From JavaScript".

  🧙‍♂️Эту задачу можно решить при помощь цикла for. Рекомендуем реализовать этот вариант решения, как самый эффективный.
  Другой вариант - использовать метод split строк, и метод массива join.
*/

// function capitalizeWords() {}

function capitalizeWords(str) {
   let result = '';
   let newWord = true;
   for (let i = 0; i < str.length; i++) {
      const char = str[i];

      if (char === '') {
         result += char;
         newWord = true;
      } else if (newWord) {
         result += char.toUpperCase();
         newWord = false;
      } else {
         result += char;
      }
   }
   return result;
}

console.log(capitalizeWords(""));

