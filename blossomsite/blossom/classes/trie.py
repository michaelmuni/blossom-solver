class Node: 

    def __init__(self, char):
        self.char = char
        self.is_end = False
        self.children = {}

class Trie: 

    def __init__(self):
        self.root = Node("")

    def insert(self, word):
        node = self.root 

        for char in word: 
            if char in node.children:
                node = node.children[char]
            else:
                new_node = Node(char)
                node.children[char] = new_node
                node = new_node 

        node.is_end = True

    def insert_word_list(self, word_list): 
        for word in word_list: 
            self.insert(word)

    def dfs(self, node, prefix):
        if node.is_end is True:
            self.output.append(prefix)
        
        for child in node.children.values():
            self.dfs(child, prefix + child.char)
    
    def dfs_with_letters(self, node, prefix, included_letters, letter_to_maximise):
        if node.is_end is True and len(prefix) > 5:
            score = 0

            if len(prefix) == 6:
                score += 6
            else:
                score += 12 + 3*(len(prefix)-7)

            if set(included_letters) == set(prefix): 
                score += 7 

            score += 5*prefix.count(letter_to_maximise)
            self.output.append((prefix, letter_to_maximise, score))
        
        for child in node.children.values():
            if child.char in included_letters:
                self.dfs_with_letters(child, prefix + child.char, included_letters, letter_to_maximise)
                
    def find_all_words_maximising_letters(self, letters, letter_to_maximise):
        self.output = []

        self.dfs_with_letters(self.root, "", letters, letter_to_maximise)
        return sorted(self.output, key=lambda d: d[2], reverse=True)[0:13]
    
    def find_all_words_with_letters(self, letters):
        result = []
        for letter in letters: 
            result += self.find_all_words_maximising_letters(letters, letter)

        return result