'use server';

import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc, increment, arrayUnion, Timestamp } from 'firebase/firestore';
import { differenceInCalendarDays } from 'date-fns';

export interface UserProgressData {
    xp: number;
    lastLogin: Timestamp;
    currentStreak: number;
    longestStreak: number;
    unlockedBadges: string[];
    storyProgress: {
        [storyId: string]: {
            progress: number;
            completed: boolean;
        };
    };
    unlockedStories: string[];
}

const defaultUserProgress = (userId: string): UserProgressData => ({
    xp: 0,
    lastLogin: Timestamp.now(),
    currentStreak: 1,
    longestStreak: 1,
    unlockedBadges: [],
    storyProgress: {},
    unlockedStories: ['lean_startup_quest'], // Start with the first story unlocked
});

export async function getUserProgress(userId: string): Promise<UserProgressData> {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        return userSnap.data() as UserProgressData;
    } else {
        // Create a new document if it doesn't exist
        const defaultData = defaultUserProgress(userId);
        await setDoc(userRef, defaultData);
        return defaultData;
    }
}

export async function checkAndUpdateStreak(userId: string) {
    const userRef = doc(db, 'users', userId);
    const userProgress = await getUserProgress(userId);

    const today = new Date();
    const lastLoginDate = userProgress.lastLogin.toDate();
    const diffDays = differenceInCalendarDays(today, lastLoginDate);

    if (diffDays === 1) {
        // Increment streak
        const newStreak = userProgress.currentStreak + 1;
        await updateDoc(userRef, {
            lastLogin: Timestamp.now(),
            currentStreak: newStreak,
            longestStreak: Math.max(newStreak, userProgress.longestStreak),
        });
    } else if (diffDays > 1) {
        // Reset streak
        await updateDoc(userRef, {
            lastLogin: Timestamp.now(),
            currentStreak: 1,
        });
    }
    // If diffDays is 0, do nothing.
}

export async function updateUserXP(userId: string, amount: number) {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
        xp: increment(amount),
    });
}

export async function updateStoryProgress(userId: string, storyId: string, progress: number) {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
        [`storyProgress.${storyId}.progress`]: progress,
    });
}

export async function completeStory(userId: string, storyId: string, xpGain: number) {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
        xp: increment(xpGain),
        [`storyProgress.${storyId}.progress`]: 1,
        [`storyProgress.${storyId}.completed`]: true,
    });
}

export async function unlockBadge(userId: string, badgeId: string) {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
        unlockedBadges: arrayUnion(badgeId),
    });
}

export async function unlockStory(userId: string, storyId: string) {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
        unlockedStories: arrayUnion(storyId),
    });
}
