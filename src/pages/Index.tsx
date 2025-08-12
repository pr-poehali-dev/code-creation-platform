import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface Code {
  id: string;
  code: string;
  name: string;
  description: string;
  uses: number;
  maxUses: number;
  createdBy: string;
}

interface User {
  id: string;
  username: string;
  activatedCodes: number;
  rank: number;
}

export default function Index() {
  const [activeTab, setActiveTab] = useState('home');
  const [inputCode, setInputCode] = useState('');
  const [newCodeData, setNewCodeData] = useState({
    name: '',
    description: '',
    maxUses: 100
  });
  const [masterCode, setMasterCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>({ id: '1', username: 'Player', activatedCodes: 0, rank: 1 });
  const { toast } = useToast();

  const [codes] = useState<Code[]>([
    { id: '1', code: 'WELCOME2024', name: 'Добро пожаловать', description: 'Стартовый бонус для новых игроков', uses: 234, maxUses: 1000, createdBy: 'Admin' },
    { id: '2', code: 'POWERGAMER', name: 'Сила игрока', description: 'Бонус для активных пользователей', uses: 156, maxUses: 500, createdBy: 'Admin' },
    { id: '3', code: 'EPICCODE', name: 'Эпический код', description: 'Редкий код с особыми наградами', uses: 89, maxUses: 200, createdBy: 'Admin' }
  ]);

  const [leaderboard] = useState<User[]>([
    { id: '1', username: 'CyberNinja', activatedCodes: 47, rank: 1 },
    { id: '2', username: 'QuantumGamer', activatedCodes: 42, rank: 2 },
    { id: '3', username: 'NeonWarrior', activatedCodes: 38, rank: 3 },
    { id: '4', username: 'CodeMaster', activatedCodes: 35, rank: 4 },
    { id: '5', username: 'DigitalHero', activatedCodes: 31, rank: 5 }
  ]);

  const handleActivateCode = () => {
    if (inputCode.trim() === '') {
      toast({
        title: "Ошибка",
        description: "Введите код для активации",
        variant: "destructive"
      });
      return;
    }

    const foundCode = codes.find(code => code.code === inputCode.toUpperCase());
    if (foundCode) {
      toast({
        title: "Код активирован! 🎉",
        description: `Вы активировали код: ${foundCode.name}`,
        variant: "default"
      });
      setInputCode('');
      setCurrentUser(prev => ({ ...prev, activatedCodes: prev.activatedCodes + 1 }));
    } else {
      toast({
        title: "Неверный код",
        description: "Код не найден или уже использован",
        variant: "destructive"
      });
    }
  };

  const handleCreateCode = () => {
    if (masterCode !== 'BroItsAStart') {
      toast({
        title: "Доступ запрещен",
        description: "Неверный мастер-код",
        variant: "destructive"
      });
      return;
    }

    if (!newCodeData.name || !newCodeData.description) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Код создан! ✨",
      description: `Новый код "${newCodeData.name}" успешно создан`,
      variant: "default"
    });

    setNewCodeData({ name: '', description: '', maxUses: 100 });
    setMasterCode('');
  };

  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1: return '👑';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '🎮';
    }
  };

  return (
    <div className="min-h-screen matrix-bg text-foreground">
      {/* Header */}
      <div className="bg-card/50 backdrop-blur-lg border-b border-primary/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Icon name="Terminal" className="text-primary neon-text" size={32} />
              <h1 className="text-3xl font-orbitron font-bold neon-text text-primary">CODE ACTIVATION</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-primary border-primary">
                <Icon name="Star" size={16} className="mr-1" />
                {currentUser.activatedCodes} кодов
              </Badge>
              <Badge variant="secondary" className="font-orbitron">
                {getRankEmoji(currentUser.rank)} #{currentUser.rank}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-card/50 backdrop-blur-lg">
            <TabsTrigger value="home" className="font-orbitron">
              <Icon name="Home" size={16} className="mr-2" />
              Главная
            </TabsTrigger>
            <TabsTrigger value="activate" className="font-orbitron">
              <Icon name="Key" size={16} className="mr-2" />
              Активация
            </TabsTrigger>
            <TabsTrigger value="create" className="font-orbitron">
              <Icon name="Plus" size={16} className="mr-2" />
              Создание
            </TabsTrigger>
            <TabsTrigger value="rating" className="font-orbitron">
              <Icon name="Trophy" size={16} className="mr-2" />
              Рейтинг
            </TabsTrigger>
            <TabsTrigger value="profile" className="font-orbitron">
              <Icon name="User" size={16} className="mr-2" />
              Профиль
            </TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home" className="space-y-6">
            <div className="text-center space-y-4">
              <div className="inline-block terminal-glow rounded-lg p-6 bg-card/30">
                <div className="font-mono text-sm text-muted-foreground mb-2">$ system_status --platform</div>
                <h2 className="text-4xl font-orbitron font-black neon-text text-primary mb-2">
                  СИСТЕМА АКТИВАЦИИ КОДОВ
                </h2>
                <p className="text-muted-foreground font-mono">
                  &gt; Добро пожаловать в матрицу кодов, геймер...
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="code-card hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <Icon name="Zap" className="text-accent mb-2" size={32} />
                  <CardTitle className="font-orbitron text-accent">Быстрая активация</CardTitle>
                  <CardDescription>Активируй коды мгновенно</CardDescription>
                </CardHeader>
              </Card>

              <Card className="code-card hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <Icon name="Shield" className="text-secondary mb-2" size={32} />
                  <CardTitle className="font-orbitron text-secondary">Безопасность</CardTitle>
                  <CardDescription>Защищенная система верификации</CardDescription>
                </CardHeader>
              </Card>

              <Card className="code-card hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <Icon name="Crown" className="text-destructive mb-2" size={32} />
                  <CardTitle className="font-orbitron text-destructive">Рейтинг</CardTitle>
                  <CardDescription>Соревнуйся с другими игроками</CardDescription>
                </CardHeader>
              </Card>
            </div>

            <Card className="code-card">
              <CardHeader>
                <CardTitle className="font-orbitron flex items-center">
                  <Icon name="Activity" className="mr-2 text-primary" />
                  Статистика платформы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{codes.length}</div>
                    <div className="text-sm text-muted-foreground">Активных кодов</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">{codes.reduce((sum, code) => sum + code.uses, 0)}</div>
                    <div className="text-sm text-muted-foreground">Всего активаций</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary">{leaderboard.length}</div>
                    <div className="text-sm text-muted-foreground">Активных игроков</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activate Tab */}
          <TabsContent value="activate" className="space-y-6">
            <Card className="code-card">
              <CardHeader>
                <CardTitle className="font-orbitron text-primary flex items-center">
                  <Icon name="Key" className="mr-2" />
                  Активация кода
                </CardTitle>
                <CardDescription>Введите код для получения награды</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Введите код..."
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                    className="font-mono text-lg terminal-glow"
                    onKeyPress={(e) => e.key === 'Enter' && handleActivateCode()}
                  />
                  <Button onClick={handleActivateCode} className="font-orbitron">
                    <Icon name="Unlock" size={16} className="mr-2" />
                    Активировать
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {codes.map((code) => (
                <Card key={code.id} className="code-card hover:scale-105 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="font-orbitron text-sm">{code.name}</CardTitle>
                    <CardDescription className="text-xs">{code.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Badge variant="outline" className="font-mono text-xs">
                        {code.code}
                      </Badge>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Использований:</span>
                        <span className="text-primary">{code.uses}/{code.maxUses}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Create Tab */}
          <TabsContent value="create" className="space-y-6">
            <Card className="code-card">
              <CardHeader>
                <CardTitle className="font-orbitron text-secondary flex items-center">
                  <Icon name="Plus" className="mr-2" />
                  Создание нового кода
                </CardTitle>
                <CardDescription>Для создания кода требуется мастер-код</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Введите мастер-код..."
                  type="password"
                  value={masterCode}
                  onChange={(e) => setMasterCode(e.target.value)}
                  className="font-mono terminal-glow"
                />

                {masterCode === 'BroItsAStart' && (
                  <div className="space-y-4 p-4 bg-accent/10 rounded-lg border border-accent/30">
                    <div className="flex items-center text-accent mb-2">
                      <Icon name="CheckCircle" size={16} className="mr-2" />
                      <span className="font-orbitron text-sm">Доступ разрешен</span>
                    </div>
                    <Input
                      placeholder="Название кода..."
                      value={newCodeData.name}
                      onChange={(e) => setNewCodeData({...newCodeData, name: e.target.value})}
                      className="font-mono"
                    />
                    <Input
                      placeholder="Описание кода..."
                      value={newCodeData.description}
                      onChange={(e) => setNewCodeData({...newCodeData, description: e.target.value})}
                      className="font-mono"
                    />
                    <Input
                      type="number"
                      placeholder="Максимальное количество использований..."
                      value={newCodeData.maxUses}
                      onChange={(e) => setNewCodeData({...newCodeData, maxUses: parseInt(e.target.value) || 100})}
                      className="font-mono"
                    />
                    <Button onClick={handleCreateCode} className="w-full font-orbitron">
                      <Icon name="Sparkles" size={16} className="mr-2" />
                      Создать код
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rating Tab */}
          <TabsContent value="rating" className="space-y-6">
            <Card className="code-card">
              <CardHeader>
                <CardTitle className="font-orbitron text-destructive flex items-center">
                  <Icon name="Trophy" className="mr-2" />
                  Рейтинг игроков
                </CardTitle>
                <CardDescription>Топ игроков по количеству активированных кодов</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((user, index) => (
                    <div key={user.id} className={`flex items-center justify-between p-3 rounded-lg ${
                      index < 3 ? 'bg-accent/10 border border-accent/20' : 'bg-muted/10'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getRankEmoji(user.rank)}</span>
                        <div>
                          <div className="font-orbitron font-semibold">{user.username}</div>
                          <div className="text-sm text-muted-foreground">Ранг #{user.rank}</div>
                        </div>
                      </div>
                      <Badge variant={index < 3 ? "default" : "secondary"} className="font-mono">
                        {user.activatedCodes} кодов
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="code-card">
              <CardHeader>
                <CardTitle className="font-orbitron text-primary flex items-center">
                  <Icon name="User" className="mr-2" />
                  Профиль игрока
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Имя игрока:</span>
                    <span className="font-orbitron">{currentUser.username}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Активировано кодов:</span>
                    <Badge className="font-mono">{currentUser.activatedCodes}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Текущий ранг:</span>
                    <Badge variant="secondary" className="font-orbitron">
                      {getRankEmoji(currentUser.rank)} #{currentUser.rank}
                    </Badge>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="font-orbitron mb-2">Достижения</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Badge variant="outline" className="justify-center">
                        <Icon name="Zap" size={14} className="mr-1" />
                        Первая активация
                      </Badge>
                      <Badge variant="outline" className="justify-center">
                        <Icon name="Target" size={14} className="mr-1" />
                        Точный удар
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}